import { ICommand } from '@nestjs/cqrs';
import { Product } from '../../domain/product/product.entity';

export class RequestApproveProductCommand implements ICommand {
  constructor(
    readonly data: {
      readonly product: Product;
      readonly requestMessage: string;
    }
  ) {}
}
