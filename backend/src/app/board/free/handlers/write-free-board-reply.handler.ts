import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUserQuery } from '../../../user/queries/get-user.query';
import { Error } from '../../../../infrastructure/common/error';
import { WriteFreeBoardReplyCommand } from '../commands/write-free-board-reply.command';
import { FreeBoardReply } from '../domain/free-board-reply.entity';
import { GetFreeBoardQuery } from '../queries/get-free-board.query';

@Injectable()
@CommandHandler(WriteFreeBoardReplyCommand)
export class WriteFreeBoardReplyHandler implements ICommandHandler<WriteFreeBoardReplyCommand> {
  constructor(
    @InjectRepository(FreeBoardReply) private readonly repository: Repository<FreeBoardReply>,
    private readonly queryBus: QueryBus
  ) {}

  async execute({ data }: WriteFreeBoardReplyCommand): Promise<FreeBoardReply> {
    const { reply, author, boardId, parentId } = data;

    const existsUser = await this.queryBus.execute(new GetUserQuery(author));
    if (!existsUser) throw new NotFoundException(Error.NOT_FOUND_USER);
    const existsBoard = await this.queryBus.execute(new GetFreeBoardQuery(boardId));
    if (!existsBoard) throw new NotFoundException(Error.NOT_FOUND_FREE_BOARD);
    if (parentId) {
      const existsParent = await this.repository.findOne({ where: { id: parentId } });
      if (!existsParent) throw new NotFoundException(Error.NOT_FOUND_FREE_BOARD_REPLY);
    }

    const result = this.repository.create({
      reply,
      author: { uid: author },
      freeBoard: { id: boardId },
      parent: parentId ? { id: parentId } : null
    });
    await this.repository.save(result);
    Logger.log({ message: `자유게시판에 댓글을 생성했습니다.`, id: result.id, authorId: author, boardId });
    return result;
  }
}
