import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetPromotionQuery } from '../queries/get-promotion.query';
import { Promotion } from '../domain/promotion.entity';

@Injectable()
@QueryHandler(GetPromotionQuery)
export class GetPromotionHandler implements IQueryHandler<GetPromotionQuery> {
  constructor(@InjectRepository(Promotion) private readonly repository: Repository<Promotion>) {}

  async execute({ id }: GetPromotionQuery): Promise<Promotion | undefined> {
    const promotion = await this.repository.findOne({
      where: { id },
      relations: {
        products: {
          product: true
        }
      }
    });
    if (!promotion) return undefined;
    return promotion;
  }
}
