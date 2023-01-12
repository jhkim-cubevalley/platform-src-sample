import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Inquiry } from './inquiry.entity';

@Entity('inquiry_files')
export class InquiryFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Inquiry, (inquiry) => inquiry.files)
  inquiry: Inquiry;

  @Column('varchar', { nullable: false })
  url: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
