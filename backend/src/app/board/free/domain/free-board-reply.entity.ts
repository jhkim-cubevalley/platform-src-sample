import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn
} from 'typeorm';
import { User } from '../../../user/domain/user.entity';
import { FreeBoard } from './free-board.entity';

@Entity('free_board_replies')
@Tree('materialized-path')
export class FreeBoardReply {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { nullable: false })
  reply: string;

  @ManyToOne(() => FreeBoard, (freeBoard) => freeBoard.replies, { onDelete: 'CASCADE' })
  freeBoard: FreeBoard;

  @ManyToOne(() => User, (user) => user.freeBoardReplies)
  author: User;

  /* eslint-disable no-use-before-define */
  @TreeChildren()
  next: FreeBoardReply[];

  @TreeParent({ onDelete: 'CASCADE' })
  parent: FreeBoardReply | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
