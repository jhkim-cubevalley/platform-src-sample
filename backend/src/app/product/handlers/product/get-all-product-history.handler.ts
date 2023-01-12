import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetAllProductHistoryQuery } from '../../queries/product/get-all-product-history.query';
import { ProductHistory } from '../../domain/product/product-history.entity';

@Injectable()
@QueryHandler(GetAllProductHistoryQuery)
export class GetAllProductHistoryHandler implements IQueryHandler<GetAllProductHistoryQuery> {
  constructor(@InjectRepository(ProductHistory) private readonly repository: Repository<ProductHistory>) {}

  async execute({ productId }: GetAllProductHistoryQuery): Promise<ProductHistory[]> {
    return this.repository.find({
      where: { product: { id: productId } },
      order: {
        createdAt: 'desc'
      }
    });
  }
}
