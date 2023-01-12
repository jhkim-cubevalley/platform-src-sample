import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoticeBoard } from '../domain/notice-board.entity';
import { Error } from '../../../../infrastructure/common/error';
import { DeleteNoticeCommand } from '../commands/delete-notice.command';

@Injectable()
@CommandHandler(DeleteNoticeCommand)
export class DeleteNoticeHandler implements ICommandHandler<DeleteNoticeCommand> {
  constructor(
    private readonly commandBus: CommandBus,
    @InjectRepository(NoticeBoard) private readonly noticeBoardRepository: Repository<NoticeBoard>
  ) {}

  async execute({ id }: DeleteNoticeCommand): Promise<boolean> {
    const { affected } = await this.noticeBoardRepository.delete({ id });
    if (affected <= 0) throw new NotFoundException(Error.NOT_FOUND_NOTICE);
    Logger.log({ message: `공지사항을 삭제했습니다.`, id });
    return true;
  }
}
