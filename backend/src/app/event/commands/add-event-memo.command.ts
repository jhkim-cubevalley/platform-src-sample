import { ICommand } from '@nestjs/cqrs';
import { Admin } from '../../admin/domain/admin.entity';

export class AddEventMemoCommand implements ICommand {
  constructor(
    readonly data: {
      readonly eventId: number;
      readonly title: string;
      readonly memo: string;
      readonly author: Admin;
    }
  ) {}
}
