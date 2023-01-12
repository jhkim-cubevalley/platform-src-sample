import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { NoticeBoard } from '../domain/notice-board.entity';
import { GetNoticeQuery } from '../queries/get-notice.query';

interface RelationNotice {
  readonly id: number;
  readonly title: string;
}

type GetNoticeReturnType = NoticeBoard & { next: RelationNotice | null; prev: RelationNotice | null };

@Injectable()
@QueryHandler(GetNoticeQuery)
export class GetNoticeHandler implements IQueryHandler<GetNoticeQuery> {
  constructor(@InjectRepository(NoticeBoard) private readonly noticeBoardRepository: Repository<NoticeBoard>) {}

  async execute({ id }: GetNoticeQuery): Promise<GetNoticeReturnType | undefined> {
    const result = await this.noticeBoardRepository.findOne({
      where: { id }
    });
    if (!result) return undefined;
    const prev = await this.noticeBoardRepository.find({
      where: {
        target: result.target,
        status: 'notice',
        id: MoreThan(result.id)
      },
      order: {
        id: 'ASC'
      },
      take: 1
    });
    const next = await this.noticeBoardRepository.find({
      where: {
        target: result.target,
        status: 'notice',
        id: LessThan(result.id)
      },
      order: {
        id: 'DESC'
      },
      take: 1
    });

    return {
      ...result,
      prev: prev[0] ? { id: prev[0].id, title: prev[0].title } : null,
      next: next[0] ? { id: next[0].id, title: next[0].title } : null
    };
  }
}
