import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Event } from './event.entity';
import { Admin } from '../../admin/domain/admin.entity';

@Entity('event_memos')
export class EventMemo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Event, (event) => event.memos)
  event: Event;

  @Column('varchar', { nullable: false })
  title: string;

  @Column('varchar', { length: 1000, nullable: false })
  memo: string;

  @ManyToOne(() => Admin, (admin) => admin.eventMemos)
  admin: Admin;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
