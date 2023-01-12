import { ICommand } from '@nestjs/cqrs';
import { Product } from '../../product/domain/product/product.entity';

export class CreateDefaultEventCommand implements ICommand {
  constructor(readonly product: Product) {}
}
