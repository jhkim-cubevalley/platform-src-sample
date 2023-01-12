import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../domain/reservation.entity';
import { ReservationPeople } from '../domain/reservation-people.entity';
import { Error } from '../../../infrastructure/common/error';
import { GetReservationQuery } from '../queries/get-reservation.query';
import { AgreeContractOfReservationCommand } from '../commands/agree-contract-of-reservation.command';

@Injectable()
@CommandHandler(AgreeContractOfReservationCommand)
export class AgreeContractOfReservationHandler implements ICommandHandler<AgreeContractOfReservationCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectRepository(Reservation) private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(ReservationPeople) private readonly reservationPeopleRepository: Repository<ReservationPeople>
  ) {}

  async execute({ reversationId, email }: AgreeContractOfReservationCommand): Promise<boolean> {
    const reservation = await this.queryBus.execute<unknown, Reservation>(new GetReservationQuery(reversationId));
    if (!reservation) throw new NotFoundException(Error.NOT_FOUND_RESERVATION);

    await this.reservationPeopleRepository.update(
      {
        reservation: { id: reversationId },
        email
      },
      { isContractAgree: true }
    );

    Logger.log({ message: '예약자가 계약서를 동의했습니다.', id: reservation.id, who: email });

    return true;
  }
}
