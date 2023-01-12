import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Like, Not, Repository } from 'typeorm';
import Pagination from '../../../../infrastructure/common/types/pagination-type';
import { GetAllIncentiveQuery } from '../../queries/incentive/get-all-incentive.query';
import { Incentive } from '../../domain/incentive/incentive.entity';

@Injectable()
@QueryHandler(GetAllIncentiveQuery)
export class GetAllIncentiveHandler implements IQueryHandler<GetAllIncentiveQuery> {
  constructor(@InjectRepository(Incentive) private readonly incentiveRepository: Repository<Incentive>) {}

  async execute({ data }: GetAllIncentiveQuery): Promise<Pagination<Incentive>> {
    const { offset, limit } = data;
    let pageOption = {};
    if (offset && limit) {
      pageOption = {
        take: limit,
        skip: limit * (offset - 1)
      };
    }

    let whereOption = {};
    if (data.filters.status === 'answer') whereOption = { answer: Not(IsNull()) };
    if (data.filters.status === 'no_answer') whereOption = { answer: IsNull() };
    if (data.filters.status === 'end_trip') whereOption = { isEndTrip: true };

    const [result, total] = await this.incentiveRepository.findAndCount({
      ...pageOption,
      where: {
        ...whereOption,
        user: data.filters.userEmail
          ? {
              email: Like(`%${data.filters.userEmail}%`)
            }
          : undefined
      },
      order: {
        createdAt: 'desc'
      },
      relations: {
        user: true,
        region: true,
        manager: true,
        product: {
          events: {
            eventType: true
          }
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
