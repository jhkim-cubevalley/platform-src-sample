import { ICommand } from '@nestjs/cqrs';

export class CreatePartnerCommand implements ICommand {
  constructor(
    readonly data: {
      readonly name: string;
      readonly type: string;
      readonly owner: string;
      readonly email: string;
      readonly phone: string;
      readonly fax: string;
      readonly zipcode?: string;
      readonly address?: string;
      readonly addressDetail?: string;
      readonly introduce: string;
      readonly managerId: string;
      readonly commissions: Array<{
        readonly title: string;
        readonly percent: number;
        readonly memo: string;
      }>;
    }
  ) {}
}
