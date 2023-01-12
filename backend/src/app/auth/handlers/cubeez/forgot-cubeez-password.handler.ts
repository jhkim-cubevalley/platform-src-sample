import { CACHE_MANAGER, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Cache } from 'cache-manager';
import { nanoid } from 'nanoid';
import { Error } from '../../../../infrastructure/common/error';
import { ForgotCubeezPasswordCommand } from '../../commands/cubeez/forgot-cubeez-password.command';
import { GetCubeezByEmailQuery } from '../../../cubeez/queries/get-cubeez-by-email.query';
import { SendEmailCommand } from '../../../email/send-email.command';

@Injectable()
@CommandHandler(ForgotCubeezPasswordCommand)
export class ForgotCubeezPasswordHandler implements ICommandHandler<ForgotCubeezPasswordCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  async execute(command: ForgotCubeezPasswordCommand) {
    const { email } = command.data;
    const cubeez = await this.queryBus.execute(new GetCubeezByEmailQuery(email));

    if (!cubeez) throw new NotFoundException(Error.NOT_FOUND_CUBEEZ);

    const tempId = nanoid();
    // TODO: 추후 프론트엔드 개발 시 프론트엔드쪽 비밀번호 초기화 페이지 주소를 넣어야 합니다. 관련 데이터는 id쿼리를 통해 전달합니다.
    const resetLink = (id: string) => `http://cubevalley.net/cubeez-reset-password?id=${id}`;
    await this.cacheManager.set(tempId, cubeez.uid, { ttl: 1000 * 60 * 3 });
    await this.commandBus.execute(
      new SendEmailCommand({
        to: [email],
        subject: '[큐브밸리] 큐비즈 비밀번호 초기화',
        body: `비밀번호 초기화 링크: ${resetLink(tempId)}`
      })
    );
    Logger.log({ message: `관리자에게 비밀번호 초기화 링크를 보냈습니다.`, id: cubeez.email, email });
    return true;
  }
}
