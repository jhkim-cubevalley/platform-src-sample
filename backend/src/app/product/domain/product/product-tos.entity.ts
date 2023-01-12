import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './product.entity';
import { Tos } from '../../../tos/domain/tos.entity';

@Entity('product_tos')
export class ProductTos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.tos)
  product: Product;

  @ManyToOne(() => Tos, (tos) => tos.productTos)
  tos: Tos;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
