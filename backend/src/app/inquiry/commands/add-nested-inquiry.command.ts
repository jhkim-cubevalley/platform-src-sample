import { ICommand } from '@nestjs/cqrs';
import { Cubeez } from '../../cubeez/domain/cubeez.entity';
import { Inquiry } from '../domain/inquiry.entity';

export class AddNestedInquiryCommand implements ICommand {
  constructor(
    readonly data: {
      readonly title?: string;
      readonly content: string;
      readonly category?: string;
      readonly author: Cubeez;
      readonly parent: Inquiry;
    }
  ) {}
}
