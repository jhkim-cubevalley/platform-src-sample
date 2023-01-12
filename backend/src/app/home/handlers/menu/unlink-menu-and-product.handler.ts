import { Injectable } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from '../../../product/commands/product/update-product.command';
import { UnlinkMenuAndProductCommand } from '../../commands/menu/unlink-menu-and-product.command';

@Injectable()
@CommandHandler(UnlinkMenuAndProductCommand)
export class UnlinkMenuAndProductHandler implements ICommandHandler<UnlinkMenuAndProductCommand> {
  constructor(private readonly commandBus: CommandBus) {}

  async execute({ data }: UnlinkMenuAndProductCommand): Promise<boolean> {
    const { menuOne, menuTwo, menuThree, products } = data;

    const promised = products.map(async (product) => {
      const prevCategory = product.category.map(({ categoryOne, categoryTwo, categoryThree }) => ({
        categoryOne: categoryOne.id,
        categoryTwo: categoryTwo.id,
        categoryThree: categoryThree.id
      }));
      const removedCategory = prevCategory.filter(
        ({ categoryOne, categoryTwo, categoryThree }) =>
          categoryOne !== menuOne.id && categoryTwo !== menuTwo.id && categoryThree !== menuThree.id
      );
      await this.commandBus.execute(new UpdateProductCommand(product, { categories: [...removedCategory] }));
    });

    await Promise.all(promised);

    return true;
  }
}
