import { ICommand } from '@nestjs/cqrs';
import { Inquiry } from '../domain/inquiry.entity';

export class EndInquiryCommand implements ICommand {
  constructor(readonly inquiry: Inquiry) {}
}
