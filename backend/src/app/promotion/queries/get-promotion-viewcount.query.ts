import { IQuery } from '@nestjs/cqrs';

export class GetPromotionViewcountQuery implements IQuery {
  constructor(
    readonly data: {
      readonly promotionId: string;
      readonly productId: number;
      readonly date: Date;
    }
  ) {}
}
