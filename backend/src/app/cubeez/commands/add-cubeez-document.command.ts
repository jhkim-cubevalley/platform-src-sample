import { ICommand } from '@nestjs/cqrs';
import type { Express } from 'express';
import { EntityManager } from 'typeorm';
import DocumentType from '../../../infrastructure/common/types/document-type';
import { Cubeez } from '../domain/cubeez.entity';

export class AddCubeezDocumentCommand implements ICommand {
  constructor(
    readonly data: {
      readonly cubeez: Cubeez;
      readonly type: 'profile' | DocumentType;
      readonly file: Express.Multer.File;
    },
    readonly transaction?: EntityManager
  ) {}
}
