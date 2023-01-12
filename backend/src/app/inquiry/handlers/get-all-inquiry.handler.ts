import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, IsNull, Like, Not, TreeRepository } from 'typeorm';
import * as dayjs from 'dayjs';
import { GetAllInquiryQuery } from '../queries/get-all-inquiry.query';
import Pagination from '../../../infrastructure/common/types/pagination-type';
import { Inquiry } from '../domain/inquiry.entity';

@Injectable()
@QueryHandler(GetAllInquiryQuery)
export class GetAllInquiryHandler implements IQueryHandler<GetAllInquiryQuery> {
  constructor(@InjectRepository(Inquiry) private readonly inquiryRepository: TreeRepository<Inquiry>) {}

  async execute({ data }: GetAllInquiryQuery): Promise<Pagination<Inquiry>> {
    const { offset, limit } = data;
    let pageOption = {};
    if (offset && limit) {
      pageOption = {
        take: limit,
        skip: limit * (offset - 1)
      };
    }

    let statusFilters = {};
    if (data.filters.status === 'notanswer') statusFilters = { answer: IsNull() };
    if (data.filters.status === 'answered') statusFilters = { answer: Not(IsNull()) };
    if (data.filters.status === 'closed') statusFilters = { endAt: Not(IsNull()) };

    const [result, total] = await this.inquiryRepository.findAndCount({
      ...pageOption,
      where: {
        ...statusFilters,
        author: data.filters.cubeezEmail
          ? {
              email: Like(`%${data.filters.cubeezEmail}%`)
            }
          : undefined,
        manager: data.filters.managerEmail
          ? {
              email: Like(`%${data.filters.managerEmail}%`)
            }
          : undefined,
        title: data.filters.title ? Like(`%${data.filters.title}%`) : undefined,
        content: data.filters.content ? Like(`%${data.filters.content}%`) : undefined,
        createdAt: data.filters.createdAt
          ? Between(data.filters.createdAt, dayjs(data.filters.createdAt).add(1, 'day').toDate())
          : undefined,
        isParent: true
      },
      order: {
        createdAt: 'desc'
      },
      relations: {
        author: true,
        manager: true,
        next: true,
        product: true
      }
    });

    return {
      data: result,
      pageTotal: result.length,
      total
    };
  }
}
