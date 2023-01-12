import { ICommand } from '@nestjs/cqrs';
import { Product } from '../../product/domain/product/product.entity';

export class IncreasePromotionViewcountCommand implements ICommand {
  constructor(
    readonly data: {
      readonly promotionId: string;
      readonly product: Product;
    }
  ) {}
}
