import { ICommand } from '@nestjs/cqrs';
import { Inquiry } from '../domain/inquiry.entity';

export class SetInquiryAnswerCommand implements ICommand {
  constructor(
    readonly data: {
      readonly inquiry: Inquiry;
      readonly answer: string;
    }
  ) {}
}
