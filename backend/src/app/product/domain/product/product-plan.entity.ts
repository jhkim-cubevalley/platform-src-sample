import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Product } from './product.entity';
import { ProductPlanDetail } from './product-plan-detail.entity';

@Entity('product_plans')
export class ProductPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.plan)
  product: Product;

  @Column('int', { nullable: false })
  day: number;

  @Column('text', { nullable: false })
  description: string;

  @OneToMany(() => ProductPlanDetail, (productPlanDetail) => productPlanDetail.productPlan, { onDelete: 'CASCADE' })
  planDetail: ProductPlanDetail[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
