import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn
} from 'typeorm';
import { Cubeez } from '../../cubeez/domain/cubeez.entity';
import { Admin } from '../../admin/domain/admin.entity';
import { Product } from '../../product/domain/product/product.entity';
import { InquiryFile } from './inquiry-file.entity';

@Entity('inquiries')
@Tree('materialized-path')
export class Inquiry {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { nullable: false })
  title: string;

  @Column('text', { nullable: false })
  content: string;

  @Column('varchar', { nullable: false })
  category: string;

  @ManyToOne(() => Product, (product) => product.inquiries, { nullable: true })
  product: Product | null;

  @Column('text', { nullable: true })
  answer: string | null;

  @Column('datetime', { nullable: true })
  answeredAt: Date | null;

  @ManyToOne(() => Cubeez, (cubeez) => cubeez.inquiry)
  author: Cubeez;

  @ManyToOne(() => Admin, (admin) => admin.manageInquiry)
  manager: Admin;

  @Column('datetime', { nullable: true, name: 'end_at' })
  endAt: Date;

  @Column('boolean', { nullable: false, name: 'is_parent', default: true })
  isParent: boolean;

  /* eslint-disable no-use-before-define */
  @TreeChildren()
  next: Inquiry[];

  @TreeParent()
  parent: Inquiry | null;

  @OneToMany(() => InquiryFile, (file) => file.inquiry)
  files: InquiryFile[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
