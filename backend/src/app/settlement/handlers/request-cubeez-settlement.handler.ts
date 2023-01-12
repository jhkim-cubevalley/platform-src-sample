import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestCubeezSettlementCommand } from '../commands/request-cubeez-settlement.command';
import { Error } from '../../../infrastructure/common/error';
import { Event } from '../../event/domain/event.entity';
import { GetEventQuery } from '../../event/queries/get-event.query';

@Injectable()
@CommandHandler(RequestCubeezSettlementCommand)
export class RequestCubeezSettlementHandler implements ICommandHandler<RequestCubeezSettlementCommand> {
  constructor(
    @InjectRepository(Event) private readonly repository: Repository<Event>,
    private readonly queryBus: QueryBus
  ) {}

  async execute({ eventId }: RequestCubeezSettlementCommand): Promise<boolean> {
    const existsEvent = await this.queryBus.execute(new GetEventQuery(eventId));
    if (!existsEvent) throw new NotFoundException(Error.NOT_FOUND_EVENT);
    await this.repository.update({ id: eventId }, { settlementStatus: 'doing' });
    Logger.log({ message: '여행 완료된 예약 데이터를 정산 요청했습니다.', id: eventId });
    return true;
  }
}
