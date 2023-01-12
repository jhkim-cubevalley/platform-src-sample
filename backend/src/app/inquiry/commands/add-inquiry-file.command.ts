import { ICommand } from '@nestjs/cqrs';
import type { Express } from 'express';

export class AddInquiryFileCommand implements ICommand {
  constructor(
    readonly data: {
      readonly id: number;
      readonly file: Express.Multer.File;
    }
  ) {}
}
