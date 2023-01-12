import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_viewcounts')
export class ProductViewcount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Product, (product) => product.viewcount)
  @JoinColumn()
  product: Product;

  @Column('int', { nullable: false, default: 0 })
  view: number;
}
