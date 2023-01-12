import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { filterHTML } from '../../../../infrastructure/common/util';
import { WriteFreeBoardCommand } from '../commands/write-free-board.command';
import { FreeBoard } from '../domain/free-board.entity';
import { GetUserQuery } from '../../../user/queries/get-user.query';
import { Error } from '../../../../infrastructure/common/error';

@Injectable()
@CommandHandler(WriteFreeBoardCommand)
export class WriteFreeBoardHandler implements ICommandHandler<WriteFreeBoardCommand> {
  constructor(
    @InjectRepository(FreeBoard) private readonly repository: Repository<FreeBoard>,
    private readonly queryBus: QueryBus
  ) {}

  async execute({ data }: WriteFreeBoardCommand): Promise<FreeBoard> {
    const { content, title, author } = data;

    const existsUser = await this.queryBus.execute(new GetUserQuery(author));
    if (!existsUser) throw new NotFoundException(Error.NOT_FOUND_USER);

    const clearContent = filterHTML(content);

    const result = this.repository.create({
      title,
      content: clearContent,
      author: { uid: author }
    });
    await this.repository.save(result);
    Logger.log({ message: `자유게시판에 게시글을 생성했습니다.`, id: result.id, authorId: author });
    return result;
  }
}
