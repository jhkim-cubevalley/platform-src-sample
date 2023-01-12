import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Reservation } from '../domain/reservation.entity';
import { GetAllReservationByBookerQuery } from '../queries/get-all-reservation-by-booker.query';
import { decryptString } from '../../../infrastructure/common/util';

@Injectable()
@QueryHandler(GetAllReservationByBookerQuery)
export class GetAllReservationByBookerHandler implements IQueryHandler<GetAllReservationByBookerQuery> {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(Reservation) private readonly repository: Repository<Reservation>
  ) {}

  async execute({ bookerEmail }: GetAllReservationByBookerQuery): Promise<Reservation[]> {
    let result = await this.repository.find({
      where: {
        bookerEmail
      },
      order: {
        createdAt: 'desc'
      },
      relations: {
        event: {
          product: {
            contract: true
          }
        },
        reservationPeoples: true
      }
    });

    result = result.map((reservation) => {
      if (reservation.reservationPeoples?.length > 0) {
        // eslint-disable-next-line no-param-reassign
        reservation.reservationPeoples = reservation.reservationPeoples.map(({ rnnSecond, passport, ...other }) => {
          const decryptedRnnSecond = rnnSecond ? decryptString(rnnSecond, this.config.get('PRIVACY_KEY')) : null;
          if (passport) {
            return {
              ...other,
              rnnSecond: decryptedRnnSecond,
              passport: {
                ...passport,
                passportNumber: decryptString(passport.passportNumber, this.config.get('PRIVACY_KEY'))
              }
            };
          }

          return {
            ...other,
            rnnSecond: decryptedRnnSecond,
            passport: null
          };
        });
      }
      return reservation;
    });

    return result;
  }
}
