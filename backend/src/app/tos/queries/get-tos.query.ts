import { IQuery } from '@nestjs/cqrs';

export class GetTosQuery implements IQuery {
  constructor(readonly id: string) {}
}
