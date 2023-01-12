import { IQuery } from '@nestjs/cqrs';

export class GetEventQuery implements IQuery {
  constructor(readonly id: number) {}
}
