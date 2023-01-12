import { IQuery } from '@nestjs/cqrs';

export class GetEventTypeQuery implements IQuery {
  constructor(readonly id: string) {}
}
