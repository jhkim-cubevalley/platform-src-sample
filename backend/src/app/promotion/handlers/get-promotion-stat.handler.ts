import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { Between, Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { GetPromotionStatQuery } from '../queries/get-promotion-stat.query';
import { Promotion } from '../domain/promotion.entity';
import { PromotionStat } from '../domain/promotion-stat.entity';
import { Product } from '../../product/domain/product/product.entity';
import { GetPromotionViewcountQuery } from '../queries/get-promotion-viewcount.query';
import { PromotionViewcount } from '../domain/promotion-viewcount.entity';
import { Reservation } from '../../reservation/domain/reservation.entity';
import { GetPromotionQuery } from '../queries/get-promotion.query';
import { Error } from '../../../infrastructure/common/error';
import { GetProductQuery } from '../../product/queries/product/get-product.query';

export interface StatReturnType {
  date: Date;
  view: number;
  reservation: number;
  percent: number;
  sales: number;
  promotionPrice: number;
}

@Injectable()
@QueryHandler(GetPromotionStatQuery)
export class GetPromotionStatHandler implements IQueryHandler<GetPromotionStatQuery> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly connection: Connection,
    @InjectRepository(PromotionStat) private readonly repository: Repository<PromotionStat>
  ) {}

  private async getStat(input: { promotion: Promotion; product: Product; date: Date }): Promise<StatReturnType> {
    const { promotion, product, date } = input;
    const dateWithoutTime = dayjs(date).startOf('day');
    const stat = await this.repository.findOne({
      where: {
        promotion: { id: promotion.id },
        product: { id: product.id },
        date: Between(dateWithoutTime.toDate(), dateWithoutTime.toDate())
      }
    });
    const promotionView = await this.queryBus.execute<unknown, PromotionViewcount | undefined>(
      new GetPromotionViewcountQuery({
        promotionId: promotion.id,
        productId: product.id,
        date
      })
    );
    const view = promotionView?.view ?? 0;
    const reservations = await this.connection.manager.find(Reservation, {
      where: {
        event: { product: { id: product.id } },
        createdAt: Between(
          dateWithoutTime.set('hour', 0).set('minute', 0).toDate(),
          dateWithoutTime.set('hour', 23).set('minute', 59).toDate()
        )
      }
    });

    return {
      date,
      view,
      reservation: reservations.length,
      percent: view === 0 ? 0 : reservations.length / view,
      sales: stat?.sales ?? 0,
      promotionPrice: stat?.promotionSales ?? 0
    };
  }

  async execute({ data }: GetPromotionStatQuery): Promise<StatReturnType[]> {
    const { promotionId, productId } = data;
    const result = [];
    const promotion = await this.queryBus.execute<unknown, Promotion>(new GetPromotionQuery(promotionId));
    if (!promotion) throw new NotFoundException(Error.NOT_FOUND_PROMOTION);

    if (productId) {
      const product = await this.queryBus.execute<unknown, Product>(new GetProductQuery(productId));
      if (!product) throw new NotFoundException(Error.NOT_FOUND_PRODUCT);
      const start = dayjs(promotion.dateFrom);
      const end = dayjs(promotion.dateTo);
      for (let date = start; date <= end; date = date.add(1, 'day')) {
        result.push(this.getStat({ promotion, product, date: date.toDate() }));
      }
      return Promise.all(result);
    }

    const start = dayjs(promotion.dateFrom);
    const end = dayjs(promotion.dateTo);
    const uniqueIds = Array.from(new Set(promotion.products.map(({ product: { id } }) => id)));
    await Promise.all(
      uniqueIds.map(async (id) => {
        const product = await this.queryBus.execute<unknown, Product>(new GetProductQuery(id));
        if (!product) throw new NotFoundException(Error.NOT_FOUND_PRODUCT);
        for (let date = start; date <= end; date = date.add(1, 'day')) {
          result.push(this.getStat({ promotion, product, date: date.toDate() }));
        }
      })
    );

    return Promise.all(result);
  }
}
