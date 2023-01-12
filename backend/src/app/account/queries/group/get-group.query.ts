import { IQuery } from '@nestjs/cqrs';

export class GetGroupQuery implements IQuery {
  constructor(readonly id: string) {}
}
