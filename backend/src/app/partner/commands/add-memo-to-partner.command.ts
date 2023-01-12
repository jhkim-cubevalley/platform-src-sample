import { ICommand } from '@nestjs/cqrs';
import { Admin } from '../../admin/domain/admin.entity';

export class AddMemoToPartnerCommand implements ICommand {
  constructor(
    readonly data: {
      readonly partnerId: string;
      readonly title: string;
      readonly memo: string;
      readonly author: Admin;
    }
  ) {}
}
