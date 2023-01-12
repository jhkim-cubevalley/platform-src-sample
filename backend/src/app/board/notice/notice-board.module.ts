import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { NoticeBoard } from './domain/notice-board.entity';
import { WriteNoticeHandler } from './handlers/write-notice.handler';
import { UpdateNoticeHandler } from './handlers/update-notice.handler';
import { DeleteNoticeHandler } from './handlers/delete-notice.handler';
import { GetAllNoticeHandler } from './handlers/get-all-notice.handler';
import { NoticeBoardController } from './notice-board.controller';
import { GetNoticeHandler } from './handlers/get-notice.handler';

const commandHandlers = [WriteNoticeHandler, UpdateNoticeHandler, DeleteNoticeHandler];
const queryHandlers = [GetAllNoticeHandler, GetNoticeHandler];

@Module({
  imports: [TypeOrmModule.forFeature([NoticeBoard]), CqrsModule],
  providers: [...commandHandlers, ...queryHandlers],
  controllers: [NoticeBoardController]
})
export class NoticeBoardModule {}
