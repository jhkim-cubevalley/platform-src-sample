import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReviewCommand } from '../commands/create-review.command';
import { Review } from '../domain/review.entity';
import { GetEventQuery } from '../../event/queries/get-event.query';
import { Event } from '../../event/domain/event.entity';
import { ReservationPeople } from '../../reservation/domain/reservation-people.entity';
import { Error } from '../../../infrastructure/common/error';
import { GetAllPointConfigQuery } from '../../point/queries/get-all-point-config.query';
import { GivePointCommand } from '../../point/commands/give-point.command';

@Injectable()
@CommandHandler(CreateReviewCommand)
export class CreateReviewHandler implements ICommandHandler<CreateReviewCommand> {
  constructor(
    @InjectRepository(Review) private readonly repository: Repository<Review>,
    @InjectRepository(ReservationPeople) private readonly reservationPeopleRepository: Repository<ReservationPeople>,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  async execute({ data }: CreateReviewCommand): Promise<Review> {
    const { eventId, user, ...input } = data;
    const event = await this.queryBus.execute<unknown, Event>(new GetEventQuery(eventId));
    if (!event) throw new NotFoundException(Error.NOT_FOUND_EVENT);
    const existsReservation = await this.reservationPeopleRepository.findOne({
      where: {
        email: user.email,
        reservation: {
          event: { id: eventId }
        }
      },
      relations: { reservation: { event: true } }
    });

    if (event.status !== 'trip_end' || !existsReservation) {
      throw new BadRequestException(Error.CAN_NOT_CREATE_REVIEW);
    }

    const review = this.repository.create({
      user: { uid: user.uid },
      event: { id: eventId },
      ...input
    });
    await this.repository.save(review);

    const reviewPoint = await this.queryBus.execute(new GetAllPointConfigQuery('REVIEW_POINT'));
    if (reviewPoint && reviewPoint[0]) {
      await this.commandBus.execute(
        new GivePointCommand({
          userUid: user.uid,
          value: Number(reviewPoint[0].value),
          cause: '후기 작성'
        })
      );
    }

    Logger.log({ message: '새로운 후기를 작성했습니다.', eventId, who: user.uid });
    return review;
  }
}
