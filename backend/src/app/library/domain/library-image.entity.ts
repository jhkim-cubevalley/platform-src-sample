import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Library } from './library.entity';

@Entity('library_images')
export class LibraryImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'image_url', nullable: false })
  imageUrl: string;

  @ManyToOne(() => Library, (library) => library.image)
  library: Library;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
