import { IQuery } from '@nestjs/cqrs';

export class GetCouponByEachCodeQuery implements IQuery {
  constructor(readonly eachCode: string) {}
}
