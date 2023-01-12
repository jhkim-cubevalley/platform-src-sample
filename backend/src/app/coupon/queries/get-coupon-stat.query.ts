import { IQuery } from '@nestjs/cqrs';
import { Coupon } from '../domain/coupon.entity';

export class GetCouponStatQuery implements IQuery {
  constructor(
    readonly data: {
      readonly coupon: Coupon;
      readonly filters: {
        readonly dateFrom: Date;
        readonly dateTo: Date;
      };
    }
  ) {}
}
