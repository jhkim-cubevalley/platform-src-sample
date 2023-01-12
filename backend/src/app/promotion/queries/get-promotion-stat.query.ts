import { IQuery } from '@nestjs/cqrs';

export class GetPromotionStatQuery implements IQuery {
  constructor(
    readonly data: {
      promotionId: string;
      productId?: number;
    }
  ) {}
}
