import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './product.entity';
import { Menu } from '../../../home/domain/menu/menu.entity';

@Entity('product_categories')
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.category)
  product: Product;

  @ManyToOne(() => Menu, (menu) => menu.productOne)
  categoryOne: Menu;

  @ManyToOne(() => Menu, (menu) => menu.productTwo, { nullable: true })
  categoryTwo: Menu | null;

  @ManyToOne(() => Menu, (menu) => menu.productThree, { nullable: true })
  categoryThree: Menu | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
