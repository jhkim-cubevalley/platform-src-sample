import { ICommand } from '@nestjs/cqrs';
import { EntityManager } from 'typeorm';
import { User } from '../../user/domain/user.entity';

export class AddCouponTransactionCommand implements ICommand {
  constructor(
    readonly data: {
      readonly couponCode: string;
      readonly user: User;
      readonly dbTransaction?: EntityManager;
    }
  ) {}
}
