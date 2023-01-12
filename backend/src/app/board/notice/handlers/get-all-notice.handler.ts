import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import Pagination from '../../../../infrastructure/common/types/pagination-type';
import { GetAllNoticeQuery } from '../queries/get-all-notice.query';
import { NoticeBoard } from '../domain/notice-board.entity';

@Injectable()
@QueryHandler(GetAllNoticeQuery)
export class GetAllNoticeHandler implements IQueryHandler<GetAllNoticeQuery> {
  constructor(@InjectRepository(NoticeBoard) private readonly noticeBoardRepository: Repository<NoticeBoard>) {}

  async execute({ data }: GetAllNoticeQuery): Promise<Pagination<NoticeBoard>> {
    const { offset, limit } = data;
    let pageOption = {};
    if (offset && limit) {
      pageOption = {
        take: limit,
        skip: limit * (offset - 1)
      };
    }

    const [result, total] = await this.noticeBoardRepository.findAndCount({
      ...pageOption,
      where: {
        status: data.filters.status ?? undefined,
        title: data.filters.title ? Like(`%${data.filters.title}%`) : undefined
      },
      order: {
        createdAt: 'desc'
      },
      relations: {
        author: true
      }
    });

    return {
      data: result,
      pageTotal: result.length,
      total
    };
  }
}
