import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('content_images')
export class ContentImage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // 누가 올렸는지. 계정 UUID
  @Column('varchar', { nullable: false })
  uid: string;

  @Column('varchar', { nullable: false })
  imageUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
