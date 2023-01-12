import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Error } from '../../../../infrastructure/common/error';
import { UpdateFreeBoardReplyCommand } from '../commands/update-free-board-reply.command';
import { FreeBoardReply } from '../domain/free-board-reply.entity';

@Injectable()
@CommandHandler(UpdateFreeBoardReplyCommand)
export class UpdateFreeBoardReplyHandler implements ICommandHandler<UpdateFreeBoardReplyCommand> {
  constructor(@InjectRepository(FreeBoardReply) private readonly repository: Repository<FreeBoardReply>) {}

  async execute({ id, data }: UpdateFreeBoardReplyCommand): Promise<boolean> {
    const { affected } = await this.repository.update(
      { id },
      {
        reply: data.reply
      }
    );
    if (affected <= 0) throw new NotFoundException(Error.NOT_FOUND_FREE_BOARD_REPLY);
    Logger.log({ message: `자유게시판의 댓글을 수정했습니다.`, id });
    return true;
  }
}
