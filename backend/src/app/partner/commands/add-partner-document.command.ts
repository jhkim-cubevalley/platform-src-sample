import { ICommand } from '@nestjs/cqrs';
import { Express } from 'express';

export class AddPartnerDocumentCommand implements ICommand {
  constructor(
    readonly data: {
      readonly partnerId: string;
      readonly type: 'bankBook' | 'businessRegistration' | 'etc';
      readonly file: Express.Multer.File;
    }
  ) {}
}
