import { IQuery } from '@nestjs/cqrs';

export class GetAllBadgeQuery implements IQuery {
  constructor(
    readonly data: Partial<{
      readonly name: string;
    }>
  ) {}
}
