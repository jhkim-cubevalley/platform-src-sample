import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LinkMenuAndProductCommand } from '../../commands/menu/link-menu-and-product.command';
import { UpdateProductCommand } from '../../../product/commands/product/update-product.command';
import { Error } from '../../../../infrastructure/common/error';

@Injectable()
@CommandHandler(LinkMenuAndProductCommand)
export class LinkMenuAndProductHandler implements ICommandHandler<LinkMenuAndProductCommand> {
  constructor(private readonly commandBus: CommandBus) {}

  async execute({ data }: LinkMenuAndProductCommand): Promise<boolean> {
    const { menuOne, menuTwo, menuThree, products } = data;

    if (!menuOne.isEnable || !menuTwo.isEnable || !menuThree.isEnable) {
      throw new BadRequestException(Error.DISABLE_DATAS);
    }

    const promised = products.map(async (product) => {
      const prevCategory = product.category.map(({ categoryOne, categoryTwo, categoryThree }) => ({
        categoryOne: categoryOne.id,
        categoryTwo: categoryTwo.id,
        categoryThree: categoryThree.id
      }));
      await this.commandBus.execute(
        new UpdateProductCommand(product, {
          categories: [
            ...prevCategory,
            {
              categoryOne: menuOne.id,
              categoryTwo: menuTwo.id,
              categoryThree: menuThree.id
            }
          ]
        })
      );
    });

    await Promise.all(promised);

    return true;
  }
}
