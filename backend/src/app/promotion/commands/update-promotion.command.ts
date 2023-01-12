import { ICommand } from '@nestjs/cqrs';

export class UpdatePromotionCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly data: {
      readonly title: string;
      readonly isEnable: boolean;
      readonly dateFrom?: Date;
      readonly dateTo?: Date;
      readonly partnerId?: string;
      readonly products: Array<{
        readonly productId: number;
        readonly eventIds: number[];
        readonly isPercent: boolean;
        readonly value: number;
      }>;
      readonly content: string;
    }
  ) {}
}
