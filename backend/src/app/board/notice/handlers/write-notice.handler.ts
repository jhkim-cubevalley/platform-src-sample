import { Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WriteNoticeCommand } from '../commands/write-notice.command';
import { NoticeBoard } from '../domain/notice-board.entity';
import { filterHTML } from '../../../../infrastructure/common/util';

@Injectable()
@CommandHandler(WriteNoticeCommand)
export class WriteNoticeHandler implements ICommandHandler<WriteNoticeCommand> {
  constructor(@InjectRepository(NoticeBoard) private readonly noticeBoardRepository: Repository<NoticeBoard>) {}

  async execute(command: WriteNoticeCommand): Promise<NoticeBoard> {
    const { title, content, status, target, author } = command.data;
    const clearContent = filterHTML(content);

    const notice = this.noticeBoardRepository.create({
      title,
      content: clearContent,
      status,
      target,
      author
    });
    await this.noticeBoardRepository.save(notice);
    Logger.log({ message: `공지사항을 추가했습니다.`, id: notice.id, authorId: author.uid });
    return notice;
  }
}
