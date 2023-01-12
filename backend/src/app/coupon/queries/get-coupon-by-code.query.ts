import { IQuery } from '@nestjs/cqrs';

export class GetCouponByCodeQuery implements IQuery {
  constructor(readonly code: string) {}
}
