import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import got, { HTTPError } from 'got';
import { ConfigService } from '@nestjs/config';
import { ConfirmPaymentCommand } from '../commands/confirm-payment.command';

@Injectable()
@CommandHandler(ConfirmPaymentCommand)
export class ConfirmPaymentHandler implements ICommandHandler<ConfirmPaymentCommand> {
  constructor(private readonly config: ConfigService) {}

  async execute({ data }: ConfirmPaymentCommand): Promise<boolean> {
    const { paymentKey, orderId, amount } = data;
    const apiKey = Buffer.from(`${this.config.get('TOSS_PAYMENTS_API_KEY')}:`, 'utf8').toString('base64');

    // TODO: 결제 테스트를 위해 작성된 코드입니다. 실제 환경에서는 결제 정보를 DB에 기록해야 합니다.
    try {
      await got.post('https://api.tosspayments.com/v1/payments/confirm', {
        headers: {
          Authorization: `Basic ${apiKey}`
        },
        json: {
          orderId,
          paymentKey,
          amount
        }
      });

      return true;
    } catch (e) {
      if (e instanceof HTTPError) {
        const error = JSON.parse(e.response.body as string) as { code: string; message: string };
        if (e.response.statusCode === 404) {
          throw new NotFoundException({ error: error.code, message: error.message });
        } else throw new BadRequestException({ error: error.code, message: error.message });
      }
      throw e;
    }
  }
}
