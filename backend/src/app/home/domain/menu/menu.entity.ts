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
import { ProductCategory } from '../../../product/domain/product/product-category.entity';

@Entity('menus')
@Tree('materialized-path')
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'name_ko', nullable: false })
  nameKo: string;

  @Column('varchar', { name: 'name_en', nullable: false })
  nameEn: string;

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
  next: Menu[];

  @TreeParent()
  parent: Menu | null;

  @OneToMany(() => ProductCategory, (product) => product.categoryOne)
  productOne: ProductCategory[];

  @OneToMany(() => ProductCategory, (product) => product.categoryTwo)
  productTwo: ProductCategory[];

  @OneToMany(() => ProductCategory, (product) => product.categoryThree)
  productThree: ProductCategory[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
