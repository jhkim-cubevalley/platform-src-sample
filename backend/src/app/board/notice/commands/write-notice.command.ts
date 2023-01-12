import { ICommand } from '@nestjs/cqrs';
import { Admin } from '../../../admin/domain/admin.entity';

export class WriteNoticeCommand implements ICommand {
  constructor(
    readonly data: {
      readonly title: string;
      readonly content: string;
      readonly target: 'all' | 'user' | 'cubeez';
      readonly status: 'temp' | 'notice';
      readonly author: Admin;
    }
  ) {}
}
