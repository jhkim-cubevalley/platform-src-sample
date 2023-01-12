import { ICommand } from '@nestjs/cqrs';

export class SendReservationMessageCommand implements ICommand {
  constructor(
    readonly data: {
      readonly email: string;
      readonly type: 'before' | 'after' | 'done' | 'cancel';
    }
  ) {}
}
