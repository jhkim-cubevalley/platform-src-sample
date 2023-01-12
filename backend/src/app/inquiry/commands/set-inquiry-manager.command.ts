import { ICommand } from '@nestjs/cqrs';
import { Inquiry } from '../domain/inquiry.entity';
import { Admin } from '../../admin/domain/admin.entity';

export class SetInquiryManagerCommand implements ICommand {
  constructor(
    readonly data: {
      readonly inquiry: Inquiry;
      readonly manager: Admin;
    }
  ) {}
}
