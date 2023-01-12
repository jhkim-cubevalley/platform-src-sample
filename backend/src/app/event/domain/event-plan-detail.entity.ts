import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Library } from '../../library/domain/library.entity';
import { EventPlan } from './event-plan.entity';

@Entity('event_plan_details')
export class EventPlanDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => EventPlan, (event) => event.planDetails, { onDelete: 'CASCADE' })
  eventPlan: EventPlan;

  @Column('varchar', { nullable: false })
  type: string;

  @Column('varchar', { length: 1000, nullable: true })
  content: string | null;

  @ManyToOne(() => Library, (library) => library.eventPlanDetails, { nullable: true })
  library: Library | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
