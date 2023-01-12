import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import GroupType from '../../../infrastructure/common/types/group-type';
import { Role } from './role.entity';
import { Cubeez } from '../../cubeez/domain/cubeez.entity';
import { User } from '../../user/domain/user.entity';
import { Admin } from '../../admin/domain/admin.entity';
import { Product } from '../../product/domain/product/product.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true, nullable: false })
  name: string;

  @Column('char', { length: 10, nullable: false })
  type: GroupType;

  @Column('varchar', { nullable: false })
  description: string;

  @Column('decimal', { name: 'commission_multiple', nullable: true, precision: 10, scale: 2 })
  commissionMultiple: number | null;

  @Column('decimal', { name: 'point_multiple', nullable: true, precision: 10, scale: 2 })
  pointMultiple: number | null;

  @OneToMany(() => Role, (role) => role.group)
  role: Role[];

  @OneToMany(() => Cubeez, (cubeez) => cubeez.manageGroup, { nullable: true })
  manageCubeez: Cubeez[] | null;

  @OneToMany(() => User, (user) => user.group, { nullable: true })
  user: User[] | null;

  @OneToMany(() => Cubeez, (cubeez) => cubeez.group, { nullable: true })
  cubeez: Cubeez[] | null;

  @OneToMany(() => Admin, (admin) => admin.group, { nullable: true })
  admin: Admin[] | null;

  @OneToMany(() => Product, (product) => product.manageGroup, { nullable: true })
  product: Product[] | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
