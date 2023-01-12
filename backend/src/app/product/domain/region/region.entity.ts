import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn
} from 'typeorm';
import { ProductRegion } from '../product/product-region.entity';
import { Incentive } from '../incentive/incentive.entity';
import { Badge } from '../badge/badge.entity';
import { Library } from '../../../library/domain/library.entity';

@Entity('regions')
@Tree('materialized-path')
export class Region {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('char', { length: 4, nullable: false })
  code: string;

  @Column('int', { nullable: false })
  depth: number;

  @Column('int', { nullable: false })
  priority: number;

  @Column('boolean', { name: 'is_enable', nullable: false })
  isEnable: boolean;

  /* eslint-disable no-use-before-define */
  @TreeChildren()
  next: Region[];

  @TreeParent()
  parent: Region | null;

  @OneToMany(() => ProductRegion, (product) => product.regionOne)
  productOne: ProductRegion[];

  @OneToMany(() => ProductRegion, (product) => product.regionTwo)
  productTwo: ProductRegion[];

  @OneToMany(() => ProductRegion, (product) => product.regionThree)
  productThree: ProductRegion[];

  @OneToMany(() => Incentive, (incentive) => incentive.region)
  incentive: Incentive[];

  @OneToMany(() => Badge, (badge) => badge.regionOne)
  badgeOne: Badge[];

  @OneToMany(() => Badge, (badge) => badge.regionTwo)
  badgeTwo: Badge[];

  @OneToMany(() => Badge, (badge) => badge.regionThree)
  badgeThree: Badge[];

  @OneToMany(() => Library, (library) => library.continent)
  libraryContinents: Library[];

  @OneToMany(() => Library, (library) => library.country)
  libraryContries: Library[];

  @OneToMany(() => Library, (library) => library.city)
  libraryCities: Library[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
