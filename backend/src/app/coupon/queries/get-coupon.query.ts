import { IQuery } from '@nestjs/cqrs';

export class GetCouponQuery implements IQuery {
  constructor(readonly id: string) {}
}
