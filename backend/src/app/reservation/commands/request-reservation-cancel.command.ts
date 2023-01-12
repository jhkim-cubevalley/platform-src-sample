import { ICommand } from '@nestjs/cqrs';

export class RequestReservationCancelCommand implements ICommand {
  constructor(readonly id: number) {}
}
