import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestUpdateEventCommand } from '../commands/request-update-event.command';
import { Event } from '../domain/event.entity';
import { GetEventQuery } from '../queries/get-event.query';
import { Error } from '../../../infrastructure/common/error';

@Injectable()
@CommandHandler(RequestUpdateEventCommand)
export class RequestUpdateEventHandler implements ICommandHandler<RequestUpdateEventCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @InjectRepository(Event) private readonly repository: Repository<Event>
  ) {}

  async execute({ data }: RequestUpdateEventCommand): Promise<boolean> {
    const { id, editMessage } = data;
    const event = await this.queryBus.execute(new GetEventQuery(id));
    if (!event) throw new NotFoundException(Error.NOT_FOUND_EVENT);

    await this.repository.update({ id }, { editMessage, status: 'display_stop' });

    return true;
  }
}
