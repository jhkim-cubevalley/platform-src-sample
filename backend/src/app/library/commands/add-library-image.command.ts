import { ICommand } from '@nestjs/cqrs';
import { Express } from 'express';
import { EntityManager } from 'typeorm';
import { Library } from '../domain/library.entity';

export class AddLibraryImageCommand implements ICommand {
  constructor(readonly file: Express.Multer.File, readonly library: Library, readonly transaction?: EntityManager) {}
}
