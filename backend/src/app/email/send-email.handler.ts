import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectAwsService } from 'nest-aws-sdk';
import { SES } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { SendEmailCommand } from './send-email.command';

@Injectable()
@CommandHandler(SendEmailCommand)
export class SendEmailHandler implements ICommandHandler<SendEmailCommand> {
  constructor(@InjectAwsService(SES) private readonly ses: SES, private readonly config: ConfigService) {}

  async execute({ data: { to, subject, body, from } }: SendEmailCommand) {
    try {
      const source = from ?? this.config.get('AWS_SES_SENDER');
      await this.ses
        .sendEmail({
          Destination: {
            ToAddresses: to
          },
          Message: {
            Body: {
              Text: {
                Data: body,
                Charset: 'utf-8'
              }
            },
            Subject: {
              Data: subject,
              Charset: 'utf-8'
            }
          },
          Source: source
        })
        .promise();
      Logger.log({ message: `SES를 통해 이메일을 전송했습니다.`, who: to.join(',') });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
