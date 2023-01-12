import { ICommand } from '@nestjs/cqrs';

export class ConfirmPaymentCommand implements ICommand {
  constructor(
    readonly data: {
      readonly orderId: string;
      readonly paymentKey: string;
      readonly amount: number;
    }
  ) {}
}
