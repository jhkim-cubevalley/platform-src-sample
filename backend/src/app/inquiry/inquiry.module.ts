import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Inquiry } from './domain/inquiry.entity';
import { GetAllInquiryHandler } from './handlers/get-all-inquiry.handler';
import { AddInquiryHandler } from './handlers/add-inquiry.handler';
import { AddNestedInquiryHandler } from './handlers/add-nested-inquiry.handler';
import { GetInquiryHandler } from './handlers/get-inquiry.handler';
import { InquiryController } from './inquiry.controller';
import { SetInquiryManagerHandler } from './handlers/set-inquiry-manager.handler';
import { SetInquiryAnswerHandler } from './handlers/set-inquiry-answer.handler';
import { EndInquiryHandler } from './handlers/end-inquiry.handler';
import { InquiryFile } from './domain/inquiry-file.entity';
import { AddInquiryFileHandler } from './handlers/add-inquiry-file.handler';

const commandHandler = [
  AddInquiryHandler,
  AddNestedInquiryHandler,
  SetInquiryManagerHandler,
  SetInquiryAnswerHandler,
  EndInquiryHandler,
  AddInquiryFileHandler
];
const queryHandlers = [GetAllInquiryHandler, GetInquiryHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Inquiry, InquiryFile]), CqrsModule],
  providers: [...commandHandler, ...queryHandlers],
  controllers: [InquiryController]
})
export class InquiryModule {}
