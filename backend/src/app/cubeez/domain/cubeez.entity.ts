import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import BusinessType from '../../../infrastructure/common/types/business-type';
import { AccountSns } from '../../account/domain/account-sns.entity';
import { Group } from '../../account/domain/group.entity';
import { CubeezDocument } from './cubeez-document.entity';
import { CubeezPhone } from './cubeez-phone.entity';
import { Inquiry } from '../../inquiry/domain/inquiry.entity';
import { Library } from '../../library/domain/library.entity';
import { Product } from '../../product/domain/product/product.entity';
import { Review } from '../../review/domain/review.entity';

@Entity('cubeez')
export class Cubeez {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column('varchar', { unique: true, nullable: false })
  email: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { unique: true, nullable: true })
  nickname: string | null;

  @Column('varchar', { nullable: false })
  introduce: string;

  @Column('varchar', { nullable: false, select: false })
  password: string;

  @Column('varchar', { nullable: true, name: 'profile_url' })
  profileUrl: string | null;

  @Column('boolean', { nullable: false, name: 'is_business' })
  isBusiness: boolean;

  @Column('char', { length: 5, nullable: true })
  zipcode: string | null;

  @Column('varchar', { nullable: true })
  address: string | null;

  @Column('varchar', { nullable: true, name: 'address_detail' })
  addressDetail: string | null;

  @Column('char', { length: 30, nullable: true, name: 'business_type' })
  businessType: BusinessType | null;

  @Column('varchar', { nullable: true, name: 'business_name' })
  businessName: string | null;

  @Column('boolean', { nullable: false, name: 'is_approve', default: false })
  isApprove: boolean;

  @Column('varchar', { nullable: true, name: 'deny_reason' })
  denyReason: string | null;

  @OneToMany(() => AccountSns, (accountSns) => accountSns.cubeez)
  accountSns: AccountSns[];

  @ManyToOne(() => Group, (group) => group.cubeez, { nullable: true })
  group: Group | null;

  @OneToMany(() => CubeezDocument, (document) => document.cubeez)
  cubeezDocument: CubeezDocument[];

  @OneToMany(() => CubeezPhone, (phone) => phone.cubeez)
  cubeezPhone: CubeezPhone[];

  @ManyToOne(() => Group, (group) => group.manageCubeez, { nullable: true })
  manageGroup: Group | null;

  @OneToMany(() => Inquiry, (inquiry) => inquiry.author)
  inquiry: Inquiry[];

  @OneToMany(() => Library, (library) => library.cubeez)
  library: Library[];

  @OneToMany(() => Product, (product) => product.cubeez)
  product: Product[];

  @OneToMany(() => Review, (review) => review.cubeez, { nullable: true })
  reviews: Review[] | null;

  @Column('datetime', { nullable: false, default: () => 'now()' })
  lastLogin: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
