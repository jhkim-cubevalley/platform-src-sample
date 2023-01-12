import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProductPlan } from './product-plan.entity';
import { Library } from '../../../library/domain/library.entity';

@Entity('product_plan_details')
export class ProductPlanDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProductPlan, (product) => product.planDetail, { onDelete: 'CASCADE' })
  productPlan: ProductPlan;

  @Column('varchar', { nullable: false })
  type: string;

  @Column('varchar', { length: 1000, nullable: true })
  content: string | null;

  @ManyToOne(() => Library, (library) => library.productPlanDetail, { nullable: true })
  library: Library | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
