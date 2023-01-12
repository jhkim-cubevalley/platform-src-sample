import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetPromotionQuery } from '../queries/get-promotion.query';
import { Error } from '../../../infrastructure/common/error';
import { IncreasePromotionStatCommand } from '../commands/increase-promotion-stat.command';
import { PromotionStat } from '../domain/promotion-stat.entity';
import { GetProductQuery } from '../../product/queries/product/get-product.query';

@Injectable()
@CommandHandler(IncreasePromotionStatCommand)
export class IncreasePromotionStatHandler implements ICommandHandler<IncreasePromotionStatCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectRepository(PromotionStat) private readonly repository: Repository<PromotionStat>
  ) {}

  async execute({ data }: IncreasePromotionStatCommand): Promise<boolean> {
    const { promotionId, productId, sales, promotionSales } = data;
    const promotion = await this.queryBus.execute(new GetPromotionQuery(promotionId));
    if (!promotion) throw new NotFoundException(Error.NOT_FOUND_PROMOTION);
    const product = await this.queryBus.execute(new GetProductQuery(productId));
    if (!product) throw new NotFoundException(Error.NOT_FOUND_PRODUCT);

    const exists = await this.repository.findOne({
      where: {
        promotion: { id: promotionId },
        product: { id: productId },
        date: new Date()
      }
    });
    if (exists) {
      await this.repository.increment(
        { promotion: { id: promotionId }, product: { id: productId }, date: new Date() },
        'sales',
        sales
      );
      await this.repository.increment(
        { promotion: { id: promotionId }, product: { id: productId }, date: new Date() },
        'promotionSales',
        promotionSales
      );
    } else {
      const entity = this.repository.create({
        promotion: { id: promotionId },
        product: { id: productId },
        date: new Date(),
        sales,
        promotionSales
      });
      await this.repository.save(entity);
    }

    return true;
  }
}
