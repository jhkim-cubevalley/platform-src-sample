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
import SocialType from '../../../infrastructure/common/types/social-type';
import SexType from '../../../infrastructure/common/types/sex-type';
import { AccountSns } from '../../account/domain/account-sns.entity';
import { Group } from '../../account/domain/group.entity';
import { Incentive } from '../../product/domain/incentive/incentive.entity';
import { Review } from '../../review/domain/review.entity';
import { PointTransaction } from '../../point/domain/point-transaction.entity';
import { FreeBoard } from '../../board/free/domain/free-board.entity';
import { FreeBoardReply } from '../../board/free/domain/free-board-reply.entity';
import { CouponTransaction } from '../../coupon/domain/coupon-transaction.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column('varchar', { unique: true, nullable: false })
  email: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { unique: true, nullable: false })
  nickname: string;

  @Column('char', { length: 2, nullable: false })
  sex: SexType;

  @Column('char', { length: 12, unique: true, nullable: false })
  phone: string;

  @Column('varchar', { nullable: true, select: false })
  password: string | null;

  @Column('varchar', { nullable: true, name: 'social_type' })
  socialType: SocialType | null;

  @Column('datetime', { nullable: false, default: () => 'now()' })
  lastLogin: Date;

  @Column('int', { nullable: false, default: 0 })
  point: number;

  @OneToMany(() => AccountSns, (accountSns) => accountSns.user)
  accountSns: AccountSns[];

  @ManyToOne(() => Group, (group) => group.user, { nullable: true })
  group: Group | null;

  @OneToMany(() => Incentive, (incentive) => incentive.user)
  incentive: Incentive[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => PointTransaction, (pointTransaction) => pointTransaction.user)
  pointTransactions: PointTransaction[];

  @OneToMany(() => FreeBoard, (freeBoard) => freeBoard.author)
  freeBoards: FreeBoard[];

  @OneToMany(() => FreeBoardReply, (freeBoardReply) => freeBoardReply.author)
  freeBoardReplies: FreeBoardReply[];

  @OneToMany(() => CouponTransaction, (couponTransaction) => couponTransaction.user)
  couponTransactions: CouponTransaction[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
