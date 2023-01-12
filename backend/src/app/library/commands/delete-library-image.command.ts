import { ICommand } from '@nestjs/cqrs';
import { EntityManager } from 'typeorm';
import { Library } from '../domain/library.entity';

export class DeleteLibraryImageCommand implements ICommand {
  constructor(
    readonly data: {
      readonly library: Library;
      readonly imageKey: string;
      readonly transaction?: EntityManager;
    }
  ) {}
}
