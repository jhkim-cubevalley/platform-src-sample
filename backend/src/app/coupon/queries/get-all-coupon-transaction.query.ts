import { IQuery } from '@nestjs/cqrs';

export class GetAllCouponTransactionQuery implements IQuery {
  constructor(
    readonly data: {
      readonly offset: number;
      readonly limit: number;
      readonly filters: {
        readonly couponId: string;
        readonly userName?: string;
      };
    }
  ) {}
}
