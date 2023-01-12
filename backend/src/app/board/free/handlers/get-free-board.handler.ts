import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetFreeBoardQuery } from '../queries/get-free-board.query';
import { FreeBoard } from '../domain/free-board.entity';

@Injectable()
@QueryHandler(GetFreeBoardQuery)
export class GetFreeBoardHandler implements IQueryHandler<GetFreeBoardQuery> {
  constructor(@InjectRepository(FreeBoard) private readonly repository: Repository<FreeBoard>) {}

  async execute({ id }: GetFreeBoardQuery): Promise<FreeBoard | undefined> {
    const result = await this.repository.findOne({
      where: { id },
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
    if (!result) return undefined;
    return result;
  }
}
