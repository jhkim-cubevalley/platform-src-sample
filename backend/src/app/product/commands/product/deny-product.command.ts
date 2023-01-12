import { ICommand } from '@nestjs/cqrs';
import { Admin } from '../../../admin/domain/admin.entity';

export class DenyProductCommand implements ICommand {
  constructor(
    readonly data: {
      readonly id: number;
      readonly admin: Admin;
      readonly reason: string;
    }
  ) {}
}
