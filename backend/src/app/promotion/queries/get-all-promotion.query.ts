import { IQuery } from '@nestjs/cqrs';
import { PromotionType } from '../domain/promotion.entity';

export class GetAllPromotionQuery implements IQuery {
  constructor(
    readonly data: {
      readonly offset?: number;
      readonly limit?: number;
      readonly filters?: Partial<{
        readonly type: PromotionType;
        readonly isEnable: boolean;
        readonly sort: 'best' | 'newest';
      }>;
    }
  ) {}
}
