import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { FreeBoard } from './free-board.entity';

@Entity('free_board_viewcounts')
export class FreeBoardViewcount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { nullable: false, default: 0 })
  view: number;

  @OneToOne(() => FreeBoard, (freeBoard) => freeBoard.viewcount, { onDelete: 'CASCADE' })
  @JoinColumn()
  freeBoard: FreeBoard;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
