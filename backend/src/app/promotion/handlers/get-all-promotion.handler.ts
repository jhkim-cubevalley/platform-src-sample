import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promotion } from '../domain/promotion.entity';
import { GetAllPromotionQuery } from '../queries/get-all-promotion.query';
import Pagination from '../../../infrastructure/common/types/pagination-type';

@Injectable()
@QueryHandler(GetAllPromotionQuery)
export class GetAllPromotionHandler implements IQueryHandler<GetAllPromotionQuery> {
  constructor(@InjectRepository(Promotion) private readonly repository: Repository<Promotion>) {}

  async execute({ data }: GetAllPromotionQuery): Promise<Pagination<Promotion>> {
    const { offset, limit } = data;
    let pageOption = {};
    if (offset && limit) {
      pageOption = {
        take: limit,
        skip: limit * (offset - 1)
      };
    }

    const [result, total] = await this.repository.findAndCount({
      ...pageOption,
      where: {
        type: data.filters.type,
        isEnable: data.filters.isEnable
      },
      order: {
        createdAt: data.filters.sort === 'newest' ? 'DESC' : undefined,
        products:
          data.filters.sort === 'best'
            ? {
                product: {
                  viewcount: {
                    view: 'asc'
                  }
                }
              }
            : undefined
      },
      relations: {
        products: {
          product: true
        }
      }
    });

    return {
      data: result,
      pageTotal: result.length,
      total
    };
  }
}
