import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Error } from '../../../../infrastructure/common/error';
import { filterHTML } from '../../../../infrastructure/common/util';
import { UpdateFreeBoardCommand } from '../commands/update-free-board.command';
import { FreeBoard } from '../domain/free-board.entity';

@Injectable()
@CommandHandler(UpdateFreeBoardCommand)
export class UpdateFreeBoardHandler implements ICommandHandler<UpdateFreeBoardCommand> {
  constructor(@InjectRepository(FreeBoard) private readonly repository: Repository<FreeBoard>) {}

  async execute({ id, data }: UpdateFreeBoardCommand): Promise<boolean> {
    const clearContent = filterHTML(data.content);

    const { affected } = await this.repository.update(
      { id },
      {
        title: data.title,
        content: data.content ? clearContent : undefined
      }
    );
    if (affected <= 0) throw new NotFoundException(Error.NOT_FOUND_FREE_BOARD);
    Logger.log({ message: `자유게시판의 게시글을 수정했습니다.`, id });
    return true;
  }
}
