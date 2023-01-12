import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_flights')
export class ProductFlight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.flight)
  product: Product;

  @Column('char', { length: 10, nullable: false })
  flightType: 'arrival' | 'departure';

  @Column('boolean', { nullable: false })
  isLayover: boolean;

  @Column('varchar', { nullable: false })
  flightName: string;

  @Column('varchar', { nullable: false })
  company: string;

  @Column('varchar', { nullable: false })
  seatRank: string;

  @Column('boolean', { nullable: false })
  canChange: boolean;

  @Column('varchar', { nullable: false })
  departureTime: string;

  @Column('varchar', { nullable: false })
  arrivalTime: string;

  @Column('varchar', { nullable: false })
  moveTime: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
