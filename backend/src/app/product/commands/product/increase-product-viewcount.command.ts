import { ICommand } from '@nestjs/cqrs';
import { Product } from '../../domain/product/product.entity';

export class IncreaseProductViewcountCommand implements ICommand {
  constructor(readonly product: Product) {}
}
