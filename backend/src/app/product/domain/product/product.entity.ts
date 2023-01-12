import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Cubeez } from '../../../cubeez/domain/cubeez.entity';
import { Admin } from '../../../admin/domain/admin.entity';
import { Group } from '../../../account/domain/group.entity';
import { ProductImage } from './product-image.entity';
import { ProductFlight } from './product-flight.entity';
import { ProductPlan } from './product-plan.entity';
import { ProductNote } from './product-note.entity';
import { ProductRegion } from './product-region.entity';
import { ProductCategory } from './product-category.entity';
import { ProductHistory } from './product-history.entity';
import { ProductTos } from './product-tos.entity';
import { Badge } from '../badge/badge.entity';
import { ProductApprove } from './product-approve.entity';
import { Event } from '../../../event/domain/event.entity';
import { Incentive } from '../incentive/incentive.entity';
import { PromotionProduct } from '../../../promotion/domain/promotion-product.entity';
import { Contract } from '../contract/contract.entity';
import { Inquiry } from '../../../inquiry/domain/inquiry.entity';
import { PromotionViewcount } from '../../../promotion/domain/promotion-viewcount.entity';
import { PromotionStat } from '../../../promotion/domain/promotion-stat.entity';
import { ProductViewcount } from './product-viewcount.entity';

/*
  임시저장, 승인요청, 승인, 판매중, 판매완료
  한명이라도 거절하면, 거절 deny
  모든 사람이 승인하면 request_approve
 */
export type ProductStatus = 'temp' | 'request_approve' | 'approve' | 'sale' | 'sale_end';
export const ProductStatusKO: Record<ProductStatus, string> = {
  temp: '임시저장',
  request_approve: '승인요청',
  approve: '승인',
  sale: '판매중',
  sale_end: '판매완료'
};

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('char', { length: 24, nullable: false, unique: true })
  code: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  nameEn: string;

  @Column('int', { nullable: true })
  fuelSurcharge: number | null;

  @Column('int', { nullable: true })
  priceAdult: number | null;

  @Column('int', { nullable: true })
  priceTeen: number | null;

  @Column('int', { nullable: true })
  priceKid: number | null;

  @Column('varchar', { nullable: true })
  priceText: string | null;

  @Column('int', { nullable: true })
  minPeople: number | null;

  @Column('int', { nullable: true })
  maxPeople: number | null;

  @Column('varchar', { nullable: true })
  departure: string | null;

  @Column('datetime', { nullable: true })
  dateFrom: Date | null;

  @Column('datetime', { nullable: true })
  dateTo: Date | null;

  @Column('varchar', { nullable: true })
  departurePeriod: string | null;

  @Column('int', { nullable: true })
  endDay: number | null;

  @Column('text', { nullable: true })
  description: string | null;

  @Column('varchar', { nullable: true })
  pros: string | null;

  @OneToMany(() => ProductRegion, (productRegion) => productRegion.product)
  region: ProductRegion[];

  @OneToMany(() => ProductCategory, (productCategory) => productCategory.product)
  category: ProductCategory[];

  @Column('varchar', { nullable: true })
  tag: string | null;

  @Column('boolean', { nullable: false })
  isManagement: boolean;

  @Column('varchar', { nullable: true })
  managementType: string | null;

  @Column('varchar', { length: 1000, nullable: true })
  moreMessage: string | null;

  @ManyToOne(() => Cubeez, (cubeez) => cubeez.product, { nullable: true })
  cubeez: Cubeez | null;

  @ManyToOne(() => Admin, (admin) => admin.product, { nullable: true })
  admin: Admin | null;

  @ManyToOne(() => Group, (group) => group.product, { nullable: true })
  manageGroup: Group | null;

  @Column('char', { length: 20, nullable: false })
  status: ProductStatus;

  @Column('varchar', { length: 1000, nullable: true })
  requestMessage: string | null;

  @Column('text', { nullable: true })
  content: string | null;

  @Column('int', { nullable: true })
  tripDate: number | null;

  @Column('int', { nullable: true })
  tripNight: number | null;

  @Column('text', { nullable: true })
  moreNote: string | null;

  @Column('text', { nullable: true })
  caution: string | null;

  @Column('text', { nullable: true })
  refund: string | null;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  image: ProductImage[];

  @OneToMany(() => ProductFlight, (productFlight) => productFlight.product)
  flight: ProductFlight[];

  @OneToMany(() => ProductPlan, (productPlan) => productPlan.product)
  plan: ProductPlan[];

  @OneToMany(() => ProductNote, (productNote) => productNote.product)
  note: ProductNote[];

  @OneToMany(() => ProductHistory, (history) => history.product)
  history: ProductHistory[];

  @OneToMany(() => ProductTos, (tos) => tos.product)
  tos: ProductTos[];

  @OneToMany(() => Badge, (badge) => badge.product)
  badges: Badge[];

  @OneToMany(() => ProductApprove, (approve) => approve.product)
  approves: ProductApprove[];

  @OneToMany(() => Event, (event) => event.product)
  events: Event[];

  @OneToMany(() => Incentive, (incentive) => incentive.product, { nullable: true })
  incentives: Incentive[] | null;

  @OneToMany(() => PromotionProduct, (promotionProduct) => promotionProduct.product)
  promotionProducts: PromotionProduct[];

  @ManyToOne(() => Contract, (contract) => contract.products, { nullable: true })
  contract: Contract | null;

  @OneToMany(() => Inquiry, (inquiry) => inquiry.product, { nullable: true })
  inquiries: Inquiry[] | null;

  @OneToMany(() => PromotionViewcount, (promotionViewcount) => promotionViewcount.product)
  promotionViewcounts: PromotionViewcount[];

  @OneToMany(() => PromotionStat, (promotionStat) => promotionStat.product)
  stats: PromotionStat[];

  @OneToOne(() => ProductViewcount, (productViewcount) => productViewcount.product)
  viewcount: ProductViewcount;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
