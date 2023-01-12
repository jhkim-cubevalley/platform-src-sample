import { IQuery } from '@nestjs/cqrs';

export class GetCouponTransactionByUserQuery implements IQuery {
  constructor(readonly couponCode: string, readonly userUid: string) {}
}
