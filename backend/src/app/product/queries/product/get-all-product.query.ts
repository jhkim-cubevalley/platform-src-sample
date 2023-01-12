import { IQuery } from '@nestjs/cqrs';

export class GetAllProductQuery implements IQuery {
  constructor(
    readonly data: {
      readonly offset?: number;
      readonly limit?: number;
      readonly filters?: Partial<{
        readonly status: 'temp' | 'request_approve' | 'approve' | 'sale' | 'sale_end' | 'inspect' | 'deny';
        readonly dateFrom: Date;
        readonly dateTo: Date;
        readonly continent: string;
        readonly country: string;
        readonly cubeezName: string;
        readonly name: string;
        readonly categoryOne: string;
        readonly categoryTwo: string;
        readonly categoryThree: string;
      }>;
    }
  ) {}
}
