import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { SmsClient } from '@pickk/sens';
import { SendSmsCommand } from './send-sms.command';

@Injectable()
@CommandHandler(SendSmsCommand)
export class SendSmsHandler implements ICommandHandler<SendSmsCommand> {
  constructor(private readonly config: ConfigService) {}

  async execute({ data: { to, content } }: SendSmsCommand) {
    try {
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
      await smsClient.send({
        to,
        content
      });
      Logger.log({ message: `Naver SENS를 통해 문자 메시지를 전송했습니다.`, who: to.join(',') });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
