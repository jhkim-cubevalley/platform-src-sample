import { IQuery } from '@nestjs/cqrs';

export class GetAllNoticeQuery implements IQuery {
  constructor(
    readonly data: {
      readonly offset?: number;
      readonly limit?: number;
      readonly filters?: Partial<{
        readonly status: 'temp' | 'notice';
        readonly title: string;
      }>;
    }
  ) {}
}
