import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetAllHistoryHandler } from './handlers/get-all-history.handler';
import { AddHistoryHandler } from './handlers/add-history.handler';

@Module({
  imports: [CqrsModule],
  providers: [GetAllHistoryHandler, AddHistoryHandler]
})
export class HistoryModule {}
