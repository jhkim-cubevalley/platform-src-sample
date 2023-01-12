import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Error } from '../../../infrastructure/common/error';
import { SetCubeezSettlementStatusCommand } from '../commands/set-cubeez-settlement-status.command';
import { Event } from '../../event/domain/event.entity';
import { GetEventQuery } from '../../event/queries/get-event.query';

@Injectable()
@CommandHandler(SetCubeezSettlementStatusCommand)
export class SetCubeezSettlementStatusHandler implements ICommandHandler<SetCubeezSettlementStatusCommand> {
  constructor(
    @InjectRepository(Event) private readonly repository: Repository<Event>,
    private readonly queryBus: QueryBus
  ) {}

  async execute({ data }: SetCubeezSettlementStatusCommand): Promise<boolean> {
    const { eventId, status } = data;
    const existsEvent = await this.queryBus.execute(new GetEventQuery(eventId));
    if (!existsEvent) throw new NotFoundException(Error.NOT_FOUND_EVENT);
    await this.repository.update({ id: eventId }, { settlementStatus: status });
    Logger.log({ message: '예약 데이터의 정산 상태를 변경했습니다.', id: eventId, status: data.status });
    return true;
  }
}
