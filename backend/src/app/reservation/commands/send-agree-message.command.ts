import { ICommand } from '@nestjs/cqrs';

export class SendAgreeMessageCommand implements ICommand {
  constructor(
    readonly data: {
      readonly reservationId: number;
      readonly email: string;
      readonly phone: string;
    }
  ) {}
}
