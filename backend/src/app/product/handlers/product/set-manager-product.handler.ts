import { Injectable } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SetManagerProductCommand } from '../../commands/product/set-manager-product.command';
import { Product } from '../../domain/product/product.entity';
import { AddHistoryCommand } from '../../../history/commands/add-history.command';
import { ProductHistory } from '../../domain/product/product-history.entity';

@Injectable()
@CommandHandler(SetManagerProductCommand)
export class SetManagerProductHandler implements ICommandHandler<SetManagerProductCommand> {
  constructor(
    private readonly commandBus: CommandBus,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) {}

  async execute({ data }: SetManagerProductCommand): Promise<boolean> {
    const { product, group } = data;
    await this.productRepository.update(
      {
        id: product.id
      },
      {
        manageGroup: group
      }
    );
    await this.commandBus.execute(
      new AddHistoryCommand({
        entity: ProductHistory,
        title: `'${group.name}'가 담당그룹으로 배정 되었습니다.`,
        relation: {
          product: { id: product.id }
        }
      })
    );
    return true;
  }
}
