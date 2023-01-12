import { IQuery } from '@nestjs/cqrs';

export class GetAllReservationByBookerQuery implements IQuery {
  constructor(readonly bookerEmail: string) {}
}
