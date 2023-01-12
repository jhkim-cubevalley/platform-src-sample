import { ICommand } from '@nestjs/cqrs';

export class AgreeContractOfReservationCommand implements ICommand {
  constructor(readonly reversationId: number, readonly email: string) {}
}
