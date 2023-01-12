import { ICommand } from '@nestjs/cqrs';
import { Menu } from '../../domain/menu/menu.entity';
import { Product } from '../../../product/domain/product/product.entity';

export class UnlinkMenuAndProductCommand implements ICommand {
  constructor(
    readonly data: {
      readonly menuOne: Menu;
      readonly menuTwo: Menu;
      readonly menuThree: Menu;
      readonly products: Product[];
    }
  ) {}
}
