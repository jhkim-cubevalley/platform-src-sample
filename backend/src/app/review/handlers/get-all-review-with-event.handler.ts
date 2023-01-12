import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Pagination from '../../../infrastructure/common/types/pagination-type';
import { GetAllReviewWithEventQuery } from '../queries/get-all-review-with-event.query';
import { Review } from '../domain/review.entity';

@Injectable()
@QueryHandler(GetAllReviewWithEventQuery)
export class GetAllReviewWithEventHandler implements IQueryHandler<GetAllReviewWithEventQuery> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectRepository(Review) private readonly repository: Repository<Review>
  ) {}

  async execute({ data }: GetAllReviewWithEventQuery): Promise<Pagination<Review>> {
    const { offset, limit } = data;
    let pageOption = {};
    if (offset && limit) {
      pageOption = {
        take: limit,
        skip: limit * (offset - 1)
      };
    }

    let whereOptions: FindOptionsWhere<Review> = {};
    if (data.filters.type === 'product') {
      whereOptions = { event: { product: { name: data.filters.search } } };
    }
    if (data.filters.type === 'cubeez_name') {
      whereOptions = { cubeez: { nickname: data.filters.search } };
    }
    if (data.filters.type === 'business_name') {
      whereOptions = { cubeez: { businessName: data.filters.search } };
    }
    if (data.filters.type === 'code') {
      whereOptions = { event: { code: data.filters.search } };
    }

    const [result, total] = await this.repository.findAndCount({
      ...pageOption,
      where: whereOptions,
      relations: {
        event: {
          product: {
            cubeez: true
          }
        },
        user: true,
        cubeez: true,
        files: true
      }
    });

    if (result.length > 0 && data.cubeezEmail) {
      const filteredResult = result.filter(
        ({ event }) => event.product.cubeez && event.product.cubeez.email === data.cubeezEmail
      );
      return {
        data: filteredResult,
        pageTotal: filteredResult.length,
        total: total - (result.length - filteredResult.length)
      };
    }

    return {
      data: result,
      pageTotal: result.length,
      total
    };
  }
}
