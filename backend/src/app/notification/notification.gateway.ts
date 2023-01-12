import {
  ConnectedSocket,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import type { Server, Socket } from 'socket.io';
import { CACHE_MANAGER, Inject, UseGuards } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SocketService } from './socket.service';
import { WsGuard } from '../../infrastructure/guards/ws.guard';
import JwtDecodeType from '../../infrastructure/common/types/jwt-decode-type';
import { GetUserByEmailQuery } from '../user/queries/get-user-by-email.query';
import { GetCubeezByEmailQuery } from '../cubeez/queries/get-cubeez-by-email.query';
import { GetAdminByEmailQuery } from '../admin/queries/get-admin-by-email.query';
import { getAccountByEmail, getRolePolicyArray } from '../../infrastructure/common/util';

@WebSocketGateway(8081, { transports: ['websocket'] })
export class NotificationGateway implements OnGatewayInit {
  constructor(
    private readonly socketService: SocketService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  @WebSocketServer() public server: Server;

  afterInit(server: Server) {
    this.socketService.socket = server;
  }

  private async registerNotification(socket: Socket & { decode: JwtDecodeType }): Promise<void> {
    await this.cacheManager.set(`subscribe:${socket.id}`, socket.decode);
    await this.cacheManager.set(`subscribe:${socket.decode.email}`, {
      ...socket.decode,
      id: socket.id
    });

    let account;
    if (socket.decode.type === 'USER')
      account = await this.queryBus.execute(new GetUserByEmailQuery(socket.decode.email));
    if (socket.decode.type === 'CUBEEZ')
      account = await this.queryBus.execute(new GetCubeezByEmailQuery(socket.decode.email));
    if (socket.decode.type === 'ADMIN')
      account = await this.queryBus.execute(new GetAdminByEmailQuery(socket.decode.email));

    const roles = getRolePolicyArray(account);
    await Promise.all(
      roles.map(async ({ code }) => {
        const list = (await this.cacheManager.get<Array<JwtDecodeType & { id: string }>>(`subscribe:${code}`)) ?? [];
        list.push({
          ...socket.decode,
          id: socket.id
        });
        await this.cacheManager.set(`subscribe:${code}`, list);
      })
    );
  }

  private async unregisterNotification(socket: Socket & { decode: JwtDecodeType }): Promise<void> {
    await this.cacheManager.del(`subscribe:${socket.id}`);
    await this.cacheManager.del(`subscribe:${socket.decode.email}`);

    const account = await getAccountByEmail(this.queryBus, socket.decode.email, socket.decode.type);
    const roles = getRolePolicyArray(account);
    await Promise.all(
      roles.map(async ({ code }) => {
        const notiList =
          (await this.cacheManager.get<Array<JwtDecodeType & { id: string }>>(`subscribe:${code}`)) ?? [];
        const index = notiList.findIndex(({ email }) => email === socket.decode.email);
        notiList.splice(index, 1);
        await this.cacheManager.set(`subscribe:${code}`, notiList);
      })
    );
  }

  @UseGuards(WsGuard(['USER', 'CUBEEZ', 'ADMIN']))
  @SubscribeMessage('subscribe')
  async handleUserNotification(@ConnectedSocket() socket: Socket & { decode: JwtDecodeType }): Promise<boolean> {
    await this.registerNotification(socket);
    if (socket.decode.type === 'USER') {
      socket.join('user-notification');
    }
    if (socket.decode.type === 'CUBEEZ') {
      socket.join('cubeez-notification');
    }
    if (socket.decode.type === 'ADMIN') {
      socket.join('admin-notification');
    }
    return true;
  }

  @UseGuards(WsGuard(['USER', 'CUBEEZ', 'ADMIN']))
  @SubscribeMessage('unsubscribe')
  async handleUnsubscribe(@ConnectedSocket() socket: Socket & { decode: JwtDecodeType }): Promise<boolean> {
    await this.unregisterNotification(socket);
    if (socket.decode.type === 'USER') {
      socket.leave('user-notification');
    }
    if (socket.decode.type === 'CUBEEZ') {
      socket.leave('cubeez-notification');
    }
    if (socket.decode.type === 'ADMIN') {
      socket.leave('admin-notification');
    }
    return true;
  }
}
