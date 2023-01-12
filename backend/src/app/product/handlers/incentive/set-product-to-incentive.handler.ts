import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SetProductToIncentiveCommand } from '../../commands/incentive/set-product-to-incentive.command';
import { Incentive } from '../../domain/incentive/incentive.entity';
import { GetIncentiveQuery } from '../../queries/incentive/get-incentive.query';
import { Error } from '../../../../infrastructure/common/error';
import { GetProductQuery } from '../../queries/product/get-product.query';

@Injectable()
@CommandHandler(SetProductToIncentiveCommand)
export class SetProductToIncentiveHandler implements ICommandHandler<SetProductToIncentiveCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectRepository(Incentive) private readonly repository: Repository<Incentive>
  ) {}

  async execute({ id, productId }: SetProductToIncentiveCommand): Promise<boolean> {
    const incentive = await this.queryBus.execute(new GetIncentiveQuery(id));
    if (!incentive) throw new NotFoundException(Error.NOT_FOUND_INCENTIVE);
    const product = await this.queryBus.execute(new GetProductQuery(productId));
    if (!product) throw new NotFoundException(Error.NOT_FOUND_PRODUCT);

    await this.repository.update({ id }, { product });

    return true;
  }
}
