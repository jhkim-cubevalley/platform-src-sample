import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cubeez } from './cubeez.entity';
import DocumentType from '../../../infrastructure/common/types/document-type';

@Entity('cubeez_documents')
export class CubeezDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cubeez, (cubeez) => cubeez.cubeezDocument)
  cubeez: Cubeez;

  @Column('char', { length: 30, nullable: false, name: 'document_type' })
  documentType: DocumentType;

  @Column('varchar', { nullable: false, name: 'image_url', select: false })
  imageUrl: string;
}
