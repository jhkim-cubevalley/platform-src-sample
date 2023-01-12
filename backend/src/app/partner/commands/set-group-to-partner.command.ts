import { ICommand } from '@nestjs/cqrs';

export class SetGroupToPartnerCommand implements ICommand {
  constructor(
    readonly data: {
      readonly partnerId: string;
      readonly partnerGroupId: string;
    }
  ) {}
}
