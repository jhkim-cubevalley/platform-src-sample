import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './product.entity';
import { Region } from '../region/region.entity';

@Entity('product_regions')
export class ProductRegion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.region)
  product: Product;

  @ManyToOne(() => Region, (region) => region.productOne)
  regionOne: Region;

  @ManyToOne(() => Region, (region) => region.productTwo)
  regionTwo: Region;

  @ManyToOne(() => Region, (region) => region.productThree)
  regionThree: Region;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
