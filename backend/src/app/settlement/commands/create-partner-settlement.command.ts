import { ICommand } from '@nestjs/cqrs';

export class CreatePartnerSettlementCommand implements ICommand {
  constructor(
    readonly data: {
      readonly partnerId: string;
      readonly eventId: number;
      readonly price: number;
      readonly description: string;
    }
  ) {}
}
