import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GenerateTokenCommand } from '../commands/generate-token.command';
import { GetUserByEmailQuery } from '../../user/queries/get-user-by-email.query';
import { GetCubeezByEmailQuery } from '../../cubeez/queries/get-cubeez-by-email.query';
import { GetAdminByEmailQuery } from '../../admin/queries/get-admin-by-email.query';
import { UpdateUserCommand } from '../../user/commands/update-user.command';
import { UpdateCubeezCommand } from '../../cubeez/commands/update-cubeez.command';
import { UpdateAdminCommand } from '../../admin/commands/update-admin.command';

@Injectable()
@CommandHandler(GenerateTokenCommand)
export class GenerateTokenHandler implements ICommandHandler<GenerateTokenCommand> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  async execute(command: GenerateTokenCommand) {
    const { email, name, type } = command.data;
    const secretKey = this.config.get('JWT_SECRET_KEY', '');
    const refreshSecretKey = this.config.get('JWT_REFRESH_SECRET_KEY', '');
    const expireTime = this.config.get('JWT_EXPIRE_TIME', '');
    const refreshExpireTime = this.config.get('JWT_REFRESH_EXPIRE_TIME', '');

    const accessToken = this.jwtService.sign(
      { email, name, type },
      {
        secret: secretKey,
        expiresIn: expireTime
      }
    );
    const refreshToken = this.jwtService.sign(
      { email, name, type },
      {
        secret: refreshSecretKey,
        expiresIn: refreshExpireTime
      }
    );

    if (type === 'USER') {
      const account = await this.queryBus.execute(new GetUserByEmailQuery(email));
      await this.commandBus.execute(
        new UpdateUserCommand(account.uid, {
          lastLogin: new Date()
        })
      );
    }
    if (type === 'CUBEEZ') {
      const account = await this.queryBus.execute(new GetCubeezByEmailQuery(email));
      await this.commandBus.execute(
        new UpdateCubeezCommand(account.uid, {
          lastLogin: new Date()
        })
      );
    }
    if (type === 'ADMIN') {
      const account = await this.queryBus.execute(new GetAdminByEmailQuery(email));
      await this.commandBus.execute(
        new UpdateAdminCommand(account.uid, {
          lastLogin: new Date()
        })
      );
    }

    Logger.log({ message: `새로운 토큰을 발급하였습니다.`, who: email, type });

    return {
      accessToken,
      refreshToken
    };
  }
}
