import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { RolePolicy } from './role-policy.entity';
import { Group } from './group.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { unique: true, nullable: false })
  name: string;

  @OneToMany(() => RolePolicy, (rolePolicy) => rolePolicy.role, { onDelete: 'CASCADE' })
  rolePolicy: RolePolicy[];

  @ManyToOne(() => Group, (group) => group.role, { nullable: true })
  group: Group | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
