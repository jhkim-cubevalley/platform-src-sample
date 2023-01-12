import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Error } from '../../../../infrastructure/common/error';
import { DeleteFreeBoardCommand } from '../commands/delete-free-board.command';
import { FreeBoard } from '../domain/free-board.entity';

@Injectable()
@CommandHandler(DeleteFreeBoardCommand)
export class DeleteFreeBoardHandler implements ICommandHandler<DeleteFreeBoardCommand> {
  constructor(@InjectRepository(FreeBoard) private readonly repository: Repository<FreeBoard>) {}

  async execute({ id }: DeleteFreeBoardCommand): Promise<boolean> {
    const { affected } = await this.repository.delete({ id });
    if (affected <= 0) throw new NotFoundException(Error.NOT_FOUND_FREE_BOARD);
    Logger.log({ message: `자유게시판의 게시글을 삭제했습니다.`, id });
    return true;
  }
}
