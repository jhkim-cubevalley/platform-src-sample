import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import Pagination from '../../../../infrastructure/common/types/pagination-type';
import { GetAllFreeBoardQuery } from '../queries/get-all-free-board.query';
import { FreeBoard } from '../domain/free-board.entity';

@Injectable()
@QueryHandler(GetAllFreeBoardQuery)
export class GetAllFreeBoardHandler implements IQueryHandler<GetAllFreeBoardQuery> {
  constructor(@InjectRepository(FreeBoard) private readonly repository: Repository<FreeBoard>) {}

  async execute({ data }: GetAllFreeBoardQuery): Promise<Pagination<FreeBoard>> {
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
        title: data.filters.title ? Like(`%${data.filters.title}%`) : undefined,
        author: data.filters.authorName
          ? {
              name: Like(`%${data.filters.authorName}%`)
            }
          : undefined,
        createdAt: data.filters.dateFrom
          ? Between(data.filters.dateFrom, dayjs(data.filters.dateTo).add(1, 'day').toDate())
          : undefined
      },
      order: {
        createdAt: 'desc'
      },
      relations: {
        author: true,
        replies: {
          author: true,
          parent: true
        },
        viewcount: true
      },
      select: {
        viewcount: {
          view: true
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
