import { ICommand } from '@nestjs/cqrs';
import { Product } from '../../domain/product/product.entity';

export class CancelRequestApproveProductCommand implements ICommand {
  constructor(readonly product: Product) {}
}
