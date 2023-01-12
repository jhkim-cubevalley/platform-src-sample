import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoticeBoard } from '../domain/notice-board.entity';
import { UpdateNoticeCommand } from '../commands/update-notice.command';
import { Error } from '../../../../infrastructure/common/error';
import { filterHTML } from '../../../../infrastructure/common/util';

@Injectable()
@CommandHandler(UpdateNoticeCommand)
export class UpdateNoticeHandler implements ICommandHandler<UpdateNoticeCommand> {
  constructor(@InjectRepository(NoticeBoard) private readonly noticeBoardRepository: Repository<NoticeBoard>) {}

  async execute({ id, data }: UpdateNoticeCommand): Promise<boolean> {
    const clearContent = filterHTML(data.content);

    const { affected } = await this.noticeBoardRepository.update(
      { id },
      {
        ...data,
        content: clearContent
      }
    );
    if (affected <= 0) throw new NotFoundException(Error.NOT_FOUND_NOTICE);
    Logger.log({ message: `공지사항을 수정했습니다.`, id });
    return true;
  }
}
