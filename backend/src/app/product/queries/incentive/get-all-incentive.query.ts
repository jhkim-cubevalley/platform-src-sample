import { IQuery } from '@nestjs/cqrs';

export class GetAllIncentiveQuery implements IQuery {
  constructor(
    readonly data: {
      readonly offset?: number;
      readonly limit?: number;
      readonly filters?: Partial<{
        readonly status: 'no_answer' | 'answer' | 'end_trip';
        readonly userEmail: string;
      }>;
    }
  ) {}
}
