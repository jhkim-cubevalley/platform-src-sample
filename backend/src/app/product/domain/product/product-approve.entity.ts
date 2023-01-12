import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Admin } from '../../../admin/domain/admin.entity';

@Entity('product_approves')
export class ProductApprove {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.approves)
  product: Product;

  @ManyToOne(() => Admin, (admin) => admin.productApproves)
  admin: Admin;

  @Column('boolean', { nullable: false })
  isApprove: boolean;

  @Column('varchar', { nullable: true })
  denyReason: string;
}
