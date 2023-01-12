import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { GetAllReservationByProductQuery } from '../queries/get-all-reservation-by-product.query';
import { Reservation } from '../domain/reservation.entity';
import Pagination from '../../../infrastructure/common/types/pagination-type';
import { decryptString } from '../../../infrastructure/common/util';

@Injectable()
@QueryHandler(GetAllReservationByProductQuery)
export class GetAllReservationByProductHandler implements IQueryHandler<GetAllReservationByProductQuery> {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(Reservation) private readonly repository: Repository<Reservation>
  ) {}

  async execute({ productId, data }: GetAllReservationByProductQuery): Promise<Pagination<Reservation>> {
    const { offset, limit } = data;
    let pageOption = {};
    if (offset && limit) {
      pageOption = {
        take: limit,
        skip: limit * (offset - 1)
      };
    }

    const resultAndTotal = await this.repository.findAndCount({
      ...pageOption,
      relations: {
        event: {
          product: {
            contract: true
          }
        },
        reservationPeoples: true
      },
      where: {
        event: { product: { id: productId } },
        status: data.filters.status,
        bookerName: data.filters.name ? Like(`%${data.filters.name}%`) : undefined,
        bookerPhone: data.filters.phone
      },
      order: {
        createdAt: 'desc'
      }
    });
    let result = resultAndTotal[0];
    const total = resultAndTotal[1];

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

    return {
      data: result,
      pageTotal: result.length,
      total
    };
  }
}
