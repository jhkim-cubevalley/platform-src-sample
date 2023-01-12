import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Cache } from 'cache-manager';
import { SendNotificationCommand } from '../commands/send-notification.command';
import { SocketService } from '../socket.service';
import JwtDecodeType from '../../../infrastructure/common/types/jwt-decode-type';
import { getAccountByEmail, getRolePolicyArray } from '../../../infrastructure/common/util';

@Injectable()
@CommandHandler(SendNotificationCommand)
export class SendNotificationHandler implements ICommandHandler<SendNotificationCommand> {
  constructor(
    private readonly socketService: SocketService,
    private readonly queryBus: QueryBus,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  async execute({ target, data, role, email }: SendNotificationCommand): Promise<boolean> {
    if (email) {
      const cache: { id: string } = await this.cacheManager.get(`subscribe:${email}`);
      if (!cache) return false;
      this.socketService.socket.sockets[cache.id].emit('notification', data);
      return true;
    }
    if (role) {
      const accounts =
        (await this.cacheManager.get<Array<JwtDecodeType & { id: string }>>(`subscribe:${role.code}`)) ?? [];
      await Promise.all(
        accounts.map(async ({ id, type, email: tokenEmail }) => {
          const account = await getAccountByEmail(this.queryBus, tokenEmail, type);
          const roles = getRolePolicyArray(account);
          const { canAccess, canUpdate, canApprove } = roles.filter(({ code }) => code === role.code)[0];
          if ((role.canUpdate ?? false) && !canUpdate) return false;
          if ((role.canApprove ?? false) && !canApprove) return false;
          if ((role.canAccess ?? false) && !canAccess) return false;
          this.socketService.socket.to(id).emit('notification', data);
          return true;
        })
      );
      return true;
    }
    this.socketService.socket.in(`${target.toLocaleLowerCase()}-notification`).emit('notification', data);
    Logger.log({ message: `시스템 메시지를 보냈습니다.`, email, type: target });
    return true;
  }
}
