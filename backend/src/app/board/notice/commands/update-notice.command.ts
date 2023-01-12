import { ICommand } from '@nestjs/cqrs';
import { DeepPartial } from 'typeorm';
import { NoticeBoard } from '../domain/notice-board.entity';

export class UpdateNoticeCommand implements ICommand {
  constructor(readonly id: number, readonly data: Exclude<DeepPartial<NoticeBoard>, 'author'>) {}
}
