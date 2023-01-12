import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateEventTypeCommand } from '../commands/update-event-type.command';
import { Error } from '../../../infrastructure/common/error';
import { EventFlight } from '../domain/event-flight.entity';
import { EventPlan } from '../domain/event-plan.entity';
import { EventPlanDetail } from '../domain/event-plan-detail.entity';
import { AddHistoryCommand } from '../../history/commands/add-history.command';
import { EventHistory } from '../domain/event-history.entity';
import { EventType } from '../domain/event-type.entity';
import { GetEventTypeQuery } from '../queries/get-event-type.query';

@Injectable()
@CommandHandler(UpdateEventTypeCommand)
export class UpdateEventTypeHandler implements ICommandHandler<UpdateEventTypeCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly connection: Connection,
    @InjectRepository(EventFlight) private readonly eventFlightRepository: Repository<EventFlight>,
    @InjectRepository(EventPlan) private readonly eventPlanRepository: Repository<EventPlan>,
    @InjectRepository(EventPlanDetail) private readonly eventPlanDetailRepository: Repository<EventPlanDetail>
  ) {}

  async execute({ id, data }: UpdateEventTypeCommand): Promise<boolean> {
    const { flights, plans, ...input } = data;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const eventType = await this.queryBus.execute(new GetEventTypeQuery(id));
      if (!eventType) throw new NotFoundException(Error.NOT_FOUND_EVENT_TYPE);

      await queryRunner.manager.update(EventType, { id }, input);

      if (flights) {
        await queryRunner.manager.delete(EventFlight, { eventType: { id } });
        await Promise.all(
          flights.map(async (flight) => {
            const departure = flight.departureTime.toString().split(':');
            const arrival = flight.arrivalTime.toString().split(':');
            const eventFlight = this.eventFlightRepository.create({
              ...flight,
              eventType,
              departureTime: `${departure[0]}:${departure[1]}:${departure[2]}`,
              arrivalTime: `${arrival[0]}:${arrival[1]}:${arrival[2]}`
            });
            await queryRunner.manager.save(eventFlight);
          })
        );
      }

      if (plans) {
        await queryRunner.manager.delete(EventPlan, { eventType: { id } });
        await queryRunner.manager.delete(EventPlanDetail, { eventPlan: { eventType: { id } } });
        await Promise.all(
          plans.map(async (plan) => {
            const eventPlan = this.eventPlanRepository.create({
              ...plan,
              eventType
            });
            await queryRunner.manager.save(eventPlan);

            await Promise.all(
              plan.details.map(async (detail) => {
                const eventPlanDetail = this.eventPlanDetailRepository.create({
                  ...detail,
                  eventPlan,
                  library: detail.libraryId ? { id: detail.libraryId } : undefined
                });
                await queryRunner.manager.save(eventPlanDetail);
              })
            );
          })
        );
      }
      await queryRunner.commitTransaction();
      Logger.log({ message: `행사 타입을 수정했습니다.`, id: eventType.id });

      if (data.status === 'display') {
        await this.commandBus.execute(
          new AddHistoryCommand({
            entity: EventHistory,
            title: '행사상품 전시가 시작 되었습니다.',
            relation: {
              event: { id: eventType.id }
            }
          })
        );
      } else if (data.status === 'trip_end') {
        await this.commandBus.execute(
          new AddHistoryCommand({
            entity: EventHistory,
            title: '행사가 종료 되었습니다.',
            relation: {
              event: { id: eventType.id }
            }
          })
        );
      } else {
        await this.commandBus.execute(
          new AddHistoryCommand({
            entity: EventHistory,
            title: '행사의 수정이 완료 되었습니다. 다시 전시 될 예정입니다.',
            relation: {
              event: { id: eventType.id }
            }
          })
        );
      }

      return true;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
