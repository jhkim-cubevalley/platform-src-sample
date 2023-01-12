import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from '../../../user/domain/user.entity';
import { FreeBoardViewcount } from './free-board-viewcount.entity';
import { FreeBoardReply } from './free-board-reply.entity';

@Entity('free_boards')
export class FreeBoard {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { nullable: false })
  title: string;

  @Column('text', { nullable: false })
  content: string;

  @ManyToOne(() => User, (user) => user.freeBoards)
  author: User;

  @OneToOne(() => FreeBoardViewcount, (freeBoardViewcount) => freeBoardViewcount.freeBoard, { onDelete: 'CASCADE' })
  viewcount: FreeBoardViewcount;

  @OneToMany(() => FreeBoardReply, (freeBoardReply) => freeBoardReply.freeBoard, { onDelete: 'CASCADE' })
  replies: FreeBoardReply[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
