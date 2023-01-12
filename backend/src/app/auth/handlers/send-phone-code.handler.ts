import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { SmsClient } from '@pickk/sens';
import { CACHE_MANAGER, Inject, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { SendPhoneCodeCommand } from '../commands/send-phone-code.command';
import { generateCode } from '../../../infrastructure/common/util';

@CommandHandler(SendPhoneCodeCommand)
export class SendPhoneCodeHandler implements ICommandHandler<SendPhoneCodeCommand> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly config: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  async execute(command: SendPhoneCodeCommand) {
    const { phone } = command;
    const accessKey = this.config.get('NCP_ACCESS_KEY');
    const secretKey = this.config.get('NCP_SECRET_KEY');
    const smsServiceId = this.config.get('NCP_SENS_SERVICE_ID');
    const smsSecretKey = this.config.get('NCP_SENS_SECRET_KEY');
    const callingNumber = this.config.get('NCP_SENS_CALLING_NUMBER');
    const smsClient = new SmsClient({
      accessKey,
      secretKey,
      smsServiceId,
      smsSecretKey,
      callingNumber
    });
    const code = generateCode();

    await this.cacheManager.del(phone);
    await this.cacheManager.set(phone, code, { ttl: 1000 * 60 });

    await smsClient.send({
      to: [phone],
      content: `[큐브밸리] 인증코드 [${code}]를 입력해주세요.`
    });

    Logger.log({ message: `핸드폰 인증코드를 전송했습니다.`, to: phone });

    return true;
  }
}
