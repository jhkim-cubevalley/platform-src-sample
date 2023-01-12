import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetFreeBoardReplyQuery } from '../queries/get-free-board-reply.query';
import { FreeBoardReply } from '../domain/free-board-reply.entity';

@Injectable()
@QueryHandler(GetFreeBoardReplyQuery)
export class GetFreeBoardReplyHandler implements IQueryHandler<GetFreeBoardReplyQuery> {
  constructor(@InjectRepository(FreeBoardReply) private readonly repository: Repository<FreeBoardReply>) {}

  async execute({ id }: GetFreeBoardReplyQuery): Promise<FreeBoardReply | undefined> {
    const result = await this.repository.findOne({
      where: { id },
      relations: {
        author: true
      }
    });
    if (!result) return undefined;
    return result;
  }
}
