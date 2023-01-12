import { IQuery } from '@nestjs/cqrs';

export class GetAllFreeBoardQuery implements IQuery {
  constructor(
    readonly data: {
      readonly offset?: number;
      readonly limit?: number;
      readonly filters?: Partial<{
        readonly title: string;
        readonly authorName: string;
        readonly dateFrom: Date;
        readonly dateTo: Date;
      }>;
    }
  ) {}
}
