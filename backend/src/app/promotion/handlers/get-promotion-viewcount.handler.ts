import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { PromotionViewcount } from '../domain/promotion-viewcount.entity';
import { GetPromotionViewcountQuery } from '../queries/get-promotion-viewcount.query';
import { GetPromotionQuery } from '../queries/get-promotion.query';
import { GetProductQuery } from '../../product/queries/product/get-product.query';
import { Error } from '../../../infrastructure/common/error';

@Injectable()
@QueryHandler(GetPromotionViewcountQuery)
export class GetPromotionViewcountHandler implements IQueryHandler<GetPromotionViewcountQuery> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectRepository(PromotionViewcount) private readonly repository: Repository<PromotionViewcount>
  ) {}

  async execute({ data }: GetPromotionViewcountQuery): Promise<PromotionViewcount | undefined> {
    const { promotionId, productId, date } = data;
    const promotion = await this.queryBus.execute(new GetPromotionQuery(promotionId));
    if (!promotion) throw new NotFoundException(Error.NOT_FOUND_PROMOTION);
    const product = await this.queryBus.execute(new GetProductQuery(productId));
    if (!product) throw new NotFoundException(Error.NOT_FOUND_PRODUCT);

    const result = await this.repository.findOne({
      where: {
        promotion: { id: promotionId },
        product: { id: productId },
        date: Between(dayjs(date).startOf('day').toDate(), dayjs(date).startOf('day').toDate())
      }
    });
    if (!result) return undefined;
    return result;
  }
}
