import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export type HomeContentType = 'CUBEEZ' | 'INCENTIVE' | 'POINT';

@Entity('home_contents')
export class HomeContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('char', { length: 10, nullable: false })
  @Index()
  type: HomeContentType;

  @Column('text', { nullable: false })
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
