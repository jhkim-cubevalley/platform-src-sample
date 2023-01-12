import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Event } from './domain/event.entity';
import { EventMemo } from './domain/event-memo.entity';
import { EventFlight } from './domain/event-flight.entity';
import { EventEditFile } from './domain/event-edit-file.entity';
import { EventPlan } from './domain/event-plan.entity';
import { EventPlanDetail } from './domain/event-plan-detail.entity';
import { EventHistory } from './domain/event-history.entity';
import { GetEventHandler } from './handlers/get-event.handler';
import { GetAllEventHandler } from './handlers/get-all-event.handler';
import { CreateDefaultEventHandler } from './handlers/create-default-event.handler';
import { CreateEventTypeHandler } from './handlers/create-event-type.handler';
import { RequestEndEventHandler } from './handlers/request-end-event.handler';
import { EndEventHandler } from './handlers/end-event.handler';
import { AddRequestEditFileHandler } from './handlers/add-request-edit-file.handler';
import { RequestUpdateEventHandler } from './handlers/request-update-event.handler';
import { EventController } from './event.controller';
import { DenyUpdateEventHandler } from './handlers/deny-update-event.handler';
import { AddEventMemoHandler } from './handlers/add-event-memo.handler';
import { DeleteEventMemoHandler } from './handlers/delete-event-memo.handler';
import { EventType } from './domain/event-type.entity';
import { GetEventTypeHandler } from './handlers/get-event-type.handler';
import { SetEventTypeHandler } from './handlers/set-event-type.handler';
import { GetAllEventTypeByProductHandler } from './handlers/get-all-event-type-by-product.handler';
import { DoneUpdateEventHandler } from './handlers/done-update-event.handler';
import { SetEventStatusHandler } from './handlers/set-event-status.handler';

const eventHandlers = [
  GetEventHandler,
  GetEventTypeHandler,
  GetAllEventHandler,
  CreateDefaultEventHandler,
  CreateEventTypeHandler,
  RequestEndEventHandler,
  EndEventHandler,
  AddRequestEditFileHandler,
  RequestUpdateEventHandler,
  DenyUpdateEventHandler,
  AddEventMemoHandler,
  DeleteEventMemoHandler,
  SetEventTypeHandler,
  GetAllEventTypeByProductHandler,
  DoneUpdateEventHandler,
  SetEventStatusHandler
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Event,
      EventType,
      EventMemo,
      EventFlight,
      EventEditFile,
      EventPlan,
      EventPlanDetail,
      EventHistory
    ]),
    CqrsModule
  ],
  providers: [...eventHandlers],
  controllers: [EventController]
})
export class EventModule {}
