import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Partner } from '../../partner/domain/partner.entity';
import { CouponCode } from './coupon-code.entity';

@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  code: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  nameEn: string;

  @Column('boolean', { nullable: false })
  isEnable: boolean;

  @Column('date', { nullable: false })
  dateFrom: Date;

  @Column('date', { nullable: false })
  dateTo: Date;

  @Column('int', { nullable: false })
  salePrice: number;

  @Column('int', { nullable: false })
  amount: number;

  @Column('boolean', { nullable: false })
  canDuplicate: boolean;

  @ManyToOne(() => Partner, (partner) => partner.coupons, { nullable: true })
  partner: Partner | null;

  @OneToMany(() => CouponCode, (couponCode) => couponCode.coupon)
  generatedCodes: CouponCode;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
