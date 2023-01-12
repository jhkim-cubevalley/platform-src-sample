import { IQuery } from '@nestjs/cqrs';

export class GetReservationQuery implements IQuery {
  constructor(readonly id: number) {}
}
