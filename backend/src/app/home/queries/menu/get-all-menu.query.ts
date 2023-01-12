import { IQuery } from '@nestjs/cqrs';

export class GetAllMenuQuery implements IQuery {
  constructor(
    readonly data: {
      readonly offset?: number;
      readonly limit?: number;
      readonly filters?: Partial<{
        readonly sort: 'best' | 'newest';
      }>;
    }
  ) {}
}
