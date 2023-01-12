import { ICommand } from '@nestjs/cqrs';
import { PromotionType } from '../domain/promotion.entity';

export class CreatePromotionCommand implements ICommand {
  constructor(
    readonly data: {
      readonly title: string;
      readonly type: PromotionType;
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
