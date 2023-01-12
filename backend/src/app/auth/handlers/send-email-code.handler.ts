import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CACHE_MANAGER, Inject, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { generateCode } from '../../../infrastructure/common/util';
import { SendEmailCodeCommand } from '../commands/send-email-code.command';
import { SendEmailCommand } from '../../email/send-email.command';

@CommandHandler(SendEmailCodeCommand)
export class SendEmailCodeHandler implements ICommandHandler<SendEmailCodeCommand> {
  constructor(private readonly commandBus: CommandBus, @Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async execute(command: SendEmailCodeCommand) {
    const { email } = command;
    const code = generateCode();

    await this.cacheManager.del(email);
    await this.cacheManager.set(email, code, { ttl: 1000 * 60 });
    await this.commandBus.execute(
      new SendEmailCommand({
        to: [email],
        subject: '[큐브밸리] 회원가입 이메일 인증코드',
        body: `이메일 인증코드 [${code}]를 입력해주세요.`
      })
    );

    Logger.log({ message: `이메일 인증코드를 전송했습니다.`, to: email });

    return true;
  }
}
