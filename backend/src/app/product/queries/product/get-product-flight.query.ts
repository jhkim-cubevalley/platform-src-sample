import { IQuery } from '@nestjs/cqrs';

export class GetProductFlightQuery implements IQuery {
  constructor(readonly id: number) {}
}
