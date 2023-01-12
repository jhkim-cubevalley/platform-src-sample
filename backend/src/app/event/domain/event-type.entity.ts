import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { EventFlight } from './event-flight.entity';
import { EventPlan } from './event-plan.entity';
import { Event } from './event.entity';

@Entity('event_types')
export class EventType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('char', { length: 2, nullable: false })
  type: string;

  @Column('varchar', { nullable: false })
  description: string;

  @Column('int', { nullable: false })
  fuelSurcharge: number;

  @Column('int', { nullable: false })
  priceAdult: number;

  @Column('int', { nullable: false })
  priceTeen: number;

  @Column('int', { nullable: false })
  priceKid: number;

  @Column('varchar', { nullable: true })
  priceText: string | null;

  @OneToMany(() => EventFlight, (flight) => flight.eventType)
  flights: EventFlight[];

  @OneToMany(() => EventPlan, (plan) => plan.eventType)
  plans: EventPlan[];

  @OneToMany(() => Event, (event) => event.eventType, { nullable: true })
  events: Event[] | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
