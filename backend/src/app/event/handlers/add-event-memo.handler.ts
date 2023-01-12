import { Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddEventMemoCommand } from '../commands/add-event-memo.command';
import { EventMemo } from '../domain/event-memo.entity';
import { GetEventQuery } from '../queries/get-event.query';

@Injectable()
@CommandHandler(AddEventMemoCommand)
export class AddEventMemoHandler implements ICommandHandler<AddEventMemoCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectRepository(EventMemo) private readonly repository: Repository<EventMemo>
  ) {}

  async execute({ data }: AddEventMemoCommand): Promise<EventMemo> {
    const { eventId, title, memo, author } = data;
    const event = await this.queryBus.execute(new GetEventQuery(eventId));
    const result = await this.repository.create({
      event,
      title,
      memo,
      admin: author
    });
    await this.repository.save(result);
    Logger.log({ message: '행사에 메모를 추가했습니다.', id: result.id, eventId });
    return result;
  }
}
