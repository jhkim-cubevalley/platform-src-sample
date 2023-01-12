import { CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Coupon } from './coupon.entity';
import { CouponTransaction } from './coupon-transaction.entity';

@Entity('coupon_codes')
export class CouponCode {
  @PrimaryColumn('varchar', { nullable: false })
  code: string;

  @ManyToOne(() => Coupon, (coupon) => coupon.generatedCodes)
  coupon: Coupon;

  @OneToMany(() => CouponTransaction, (couponTransaction) => couponTransaction.couponCode)
  transactions: CouponTransaction[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
