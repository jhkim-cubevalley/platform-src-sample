import { BadRequestException, CACHE_MANAGER, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Cache } from 'cache-manager';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ResetUserPasswordCommand } from '../../commands/user/reset-user-password.command';
import { Error } from '../../../../infrastructure/common/error';
import { UpdateUserCommand } from '../../../user/commands/update-user.command';

@Injectable()
@CommandHandler(ResetUserPasswordCommand)
export class ResetUserPasswordHandler implements ICommandHandler<ResetUserPasswordCommand> {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly config: ConfigService
  ) {}

  async execute(command: ResetUserPasswordCommand) {
    const { id, newPassword } = command;
    const tempData = await this.cacheManager.get<string>(id);

    if (!tempData) {
      throw new BadRequestException(Error.FAIL_RESET_PASSWORD);
    }

    const hashRound = parseInt(this.config.get('PASSWORD_SALT_ROUND', '12'), 10);
    const hashedPassword = await hash(newPassword, hashRound);
    const result = await this.commandBus.execute(new UpdateUserCommand(tempData, { password: hashedPassword }));

    await this.cacheManager.del(id);

    if (!result) {
      throw new NotFoundException(Error.NOT_FOUND_USER);
    }

    Logger.log({ message: `고객의 비밀번호를 재설정하였습니다.`, who: tempData });

    return result;
  }
}
