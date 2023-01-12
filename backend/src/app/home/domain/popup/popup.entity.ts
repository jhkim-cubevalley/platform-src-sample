import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('popups')
export class Popup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  title: string;

  @Column('varchar', { nullable: false })
  link: string;

  @Column('varchar', { nullable: true })
  imageUrl: string | null;

  @Column('boolean', { nullable: false })
  useCookie: boolean;

  @Column('int', { nullable: true })
  cookieDay: number | null;

  @Column('boolean', { nullable: false, default: true })
  isEnable: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
