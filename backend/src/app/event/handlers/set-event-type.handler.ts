import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SetEventTypeCommand } from '../commands/set-event-type.command';
import { GetEventQuery } from '../queries/get-event.query';
import { GetEventTypeQuery } from '../queries/get-event-type.query';
import { EventType } from '../domain/event-type.entity';
import { Error } from '../../../infrastructure/common/error';
import { Event } from '../domain/event.entity';

@Injectable()
@CommandHandler(SetEventTypeCommand)
export class SetEventTypeHandler implements ICommandHandler<SetEventTypeCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectRepository(Event) private readonly eventRepository: Repository<Event>
  ) {}

  async execute({ data }: SetEventTypeCommand): Promise<boolean> {
    const { eventId, eventTypeId } = data;
    const event = await this.queryBus.execute<unknown, Event>(new GetEventQuery(eventId));
    const eventType = await this.queryBus.execute<unknown, EventType>(new GetEventTypeQuery(eventTypeId));
    if (!event) throw new NotFoundException(Error.NOT_FOUND_EVENT);
    if (!eventType) throw new NotFoundException(Error.NOT_FOUND_EVENT_TYPE);

    await this.eventRepository.update(
      { id: eventId },
      {
        eventType
      }
    );

    return true;
  }
}
