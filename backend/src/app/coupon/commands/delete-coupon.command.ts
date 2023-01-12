import { ICommand } from '@nestjs/cqrs';
import { Coupon } from '../domain/coupon.entity';

export class DeleteCouponCommand implements ICommand {
  constructor(readonly coupon: Coupon) {}
}
