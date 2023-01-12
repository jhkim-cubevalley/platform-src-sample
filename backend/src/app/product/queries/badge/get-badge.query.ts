import { IQuery } from '@nestjs/cqrs';

export class GetBadgeQuery implements IQuery {
  constructor(readonly id: string) {}
}
