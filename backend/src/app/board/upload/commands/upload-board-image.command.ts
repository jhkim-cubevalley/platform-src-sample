import { ICommand } from '@nestjs/cqrs';
import { Express } from 'express';

export class UploadBoardImageCommand implements ICommand {
  constructor(
    readonly data: {
      readonly file: Express.Multer.File;
      readonly uid: string;
    }
  ) {}
}
