import { BadRequestException, CACHE_MANAGER, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Cache } from 'cache-manager';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Error } from '../../../../infrastructure/common/error';
import { ResetCubeezPasswordCommand } from '../../commands/cubeez/reset-cubeez-password.command';
import { UpdateCubeezCommand } from '../../../cubeez/commands/update-cubeez.command';

@Injectable()
@CommandHandler(ResetCubeezPasswordCommand)
export class ResetCubeezPasswordHandler implements ICommandHandler<ResetCubeezPasswordCommand> {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly config: ConfigService
  ) {}

  async execute(command: ResetCubeezPasswordCommand) {
    const { id, newPassword } = command.data;
    const tempData = await this.cacheManager.get<string>(id);

    if (!tempData) {
      throw new BadRequestException(Error.FAIL_RESET_PASSWORD);
    }

    const hashRound = parseInt(this.config.get('PASSWORD_SALT_ROUND', '12'), 10);
    const hashedPassword = await hash(newPassword, hashRound);
    const result = await this.commandBus.execute(new UpdateCubeezCommand(tempData, { password: hashedPassword }));

    await this.cacheManager.del(id);

    if (!result) {
      throw new NotFoundException(Error.NOT_FOUND_CUBEEZ);
    }

    Logger.log({ message: `큐비즈의 비밀번호를 재설정하였습니다.`, who: tempData });

    return result;
  }
}
