import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CouponCode } from './coupon-code.entity';
import { User } from '../../user/domain/user.entity';

@Entity('coupon_transactions')
export class CouponTransaction {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => CouponCode, (couponCode) => couponCode.transactions)
  couponCode: CouponCode;

  @ManyToOne(() => User, (user) => user.couponTransactions)
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
