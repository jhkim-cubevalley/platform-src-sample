import { IQuery } from '@nestjs/cqrs';

export class GetAllPointTransactionQuery implements IQuery {
  constructor(
    readonly data: {
      readonly filters: Partial<{
        readonly userName: string;
        readonly dateFrom: Date;
        readonly dateTo: Date;
      }>;
    }
  ) {}
}
