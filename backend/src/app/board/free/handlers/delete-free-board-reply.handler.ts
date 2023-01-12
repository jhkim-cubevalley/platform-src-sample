import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Error } from '../../../../infrastructure/common/error';
import { DeleteFreeBoardReplyCommand } from '../commands/delete-free-board-reply.command';
import { FreeBoardReply } from '../domain/free-board-reply.entity';

@Injectable()
@CommandHandler(DeleteFreeBoardReplyCommand)
export class DeleteFreeBoardReplyHandler implements ICommandHandler<DeleteFreeBoardReplyCommand> {
  constructor(@InjectRepository(FreeBoardReply) private readonly repository: Repository<FreeBoardReply>) {}

  async execute({ id }: DeleteFreeBoardReplyCommand): Promise<boolean> {
    const { affected } = await this.repository.update({ id }, { reply: '삭제된 댓글입니다.' });
    await this.repository.softDelete({ id });
    if (affected <= 0) throw new NotFoundException(Error.NOT_FOUND_FREE_BOARD_REPLY);
    Logger.log({ message: `자유게시판의 댓글을 삭제했습니다.`, id });
    return true;
  }
}
