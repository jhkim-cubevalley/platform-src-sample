import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_notes')
export class ProductNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.note)
  product: Product;

  @Column('char', { length: 5, nullable: false })
  type: 'in' | 'notin';

  @Column('varchar', { nullable: false })
  title: string;

  @Column('varchar', { length: 1000, nullable: false })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
