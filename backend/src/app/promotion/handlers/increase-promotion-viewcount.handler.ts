import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { IncreasePromotionViewcountCommand } from '../commands/increase-promotion-viewcount.command';
import { PromotionViewcount } from '../domain/promotion-viewcount.entity';
import { GetPromotionQuery } from '../queries/get-promotion.query';
import { Error } from '../../../infrastructure/common/error';

@Injectable()
@CommandHandler(IncreasePromotionViewcountCommand)
export class IncreasePromotionViewcountHandler implements ICommandHandler<IncreasePromotionViewcountCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectRepository(PromotionViewcount) private readonly repository: Repository<PromotionViewcount>
  ) {}

  async execute({ data }: IncreasePromotionViewcountCommand): Promise<boolean> {
    const { promotionId, product } = data;
    const promotion = await this.queryBus.execute(new GetPromotionQuery(promotionId));
    if (!promotion) throw new NotFoundException(Error.NOT_FOUND_PROMOTION);

    const now = dayjs().startOf('day');
    const exists = await this.repository.findOne({
      where: {
        promotion: { id: promotionId },
        product: { id: product.id },
        date: Between(now.toDate(), now.toDate())
      }
    });
    if (exists) {
      await this.repository.increment(
        { promotion: { id: promotionId }, product: { id: product.id }, date: Between(now.toDate(), now.toDate()) },
        'view',
        1
      );
    } else {
      const entity = this.repository.create({
        promotion: { id: promotionId },
        product: { id: product.id },
        date: now.toDate(),
        view: 1
      });
      await this.repository.save(entity);
    }

    return true;
  }
}
