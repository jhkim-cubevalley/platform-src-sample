import { IQuery } from '@nestjs/cqrs';

export class GetGroupByNameQuery implements IQuery {
  constructor(readonly name: string) {}
}
