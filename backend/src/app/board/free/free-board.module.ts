import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { FreeBoard } from './domain/free-board.entity';
import { FreeBoardReply } from './domain/free-board-reply.entity';
import { FreeBoardViewcount } from './domain/free-board-viewcount.entity';
import { FreeBoardController } from './free-board.controller';
import { GetAllFreeBoardHandler } from './handlers/get-all-free-board.handler';
import { GetFreeBoardHandler } from './handlers/get-free-board.handler';
import { WriteFreeBoardHandler } from './handlers/write-free-board.handler';
import { UpdateFreeBoardHandler } from './handlers/update-free-board.handler';
import { DeleteFreeBoardHandler } from './handlers/delete-free-board.handler';
import { IncreaseFreeBoardViewcountHandler } from './handlers/increase-free-board-viewcount.handler';
import { WriteFreeBoardReplyHandler } from './handlers/write-free-board-reply.handler';
import { UpdateFreeBoardReplyHandler } from './handlers/update-free-board-reply.handler';
import { DeleteFreeBoardReplyHandler } from './handlers/delete-free-board-reply.handler';
import { GetFreeBoardReplyHandler } from './handlers/get-free-board-reply.handler';

const handlers = [
  GetAllFreeBoardHandler,
  GetFreeBoardHandler,
  WriteFreeBoardHandler,
  UpdateFreeBoardHandler,
  DeleteFreeBoardHandler,
  IncreaseFreeBoardViewcountHandler,
  GetFreeBoardReplyHandler,
  WriteFreeBoardReplyHandler,
  UpdateFreeBoardReplyHandler,
  DeleteFreeBoardReplyHandler
];

@Module({
  imports: [TypeOrmModule.forFeature([FreeBoard, FreeBoardReply, FreeBoardViewcount]), CqrsModule],
  providers: [...handlers],
  controllers: [FreeBoardController]
})
export class FreeBoardModule {}
