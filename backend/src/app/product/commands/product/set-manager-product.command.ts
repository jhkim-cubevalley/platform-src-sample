import { ICommand } from '@nestjs/cqrs';
import { Product } from '../../domain/product/product.entity';
import { Group } from '../../../account/domain/group.entity';

export class SetManagerProductCommand implements ICommand {
  constructor(
    readonly data: {
      readonly product: Product;
      readonly group: Group;
    }
  ) {}
}
