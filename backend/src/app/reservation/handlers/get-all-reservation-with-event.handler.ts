import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Reservation } from '../domain/reservation.entity';
import Pagination from '../../../infrastructure/common/types/pagination-type';
import { GetAllReservationWithEventQuery } from '../queries/get-all-reservation-with-event.query';
import { GetRegionQuery } from '../../product/queries/region/get-region.query';
import { Error } from '../../../infrastructure/common/error';
import { decryptString } from '../../../infrastructure/common/util';

@Injectable()
@QueryHandler(GetAllReservationWithEventQuery)
export class GetAllReservationWithEventHandler implements IQueryHandler<GetAllReservationWithEventQuery> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly config: ConfigService,
    @InjectRepository(Reservation) private readonly repository: Repository<Reservation>
  ) {}

  async execute({ data }: GetAllReservationWithEventQuery): Promise<Pagination<Reservation>> {
    const { offset, limit } = data;
    let pageOption = {};
    if (offset && limit) {
      pageOption = {
        take: limit,
        skip: limit * (offset - 1)
      };
    }

    if (data.filters.continentId && !(await this.queryBus.execute(new GetRegionQuery(data.filters.continentId)))) {
      throw new NotFoundException(Error.NOT_FOUND_REGION);
    }
    if (data.filters.countryId && !(await this.queryBus.execute(new GetRegionQuery(data.filters.countryId)))) {
      throw new NotFoundException(Error.NOT_FOUND_REGION);
    }
    if (data.filters.cityId && !(await this.queryBus.execute(new GetRegionQuery(data.filters.cityId)))) {
      throw new NotFoundException(Error.NOT_FOUND_REGION);
    }

    const resultAndTotal = await this.repository.findAndCount({
      ...pageOption,
      where: {
        event: {
          status: data.filters.eventStatus,
          product: {
            dateFrom: data.filters.dateFrom,
            dateTo: data.filters.dateTo,
            region: {
              regionOne: { id: data.filters.continentId },
              regionTwo: { id: data.filters.countryId },
              regionThree: { id: data.filters.cityId }
            },
            departure: data.filters.departure,
            cubeez: data.filters.cubeezName ? { name: Like(`%${data.filters.cubeezName}%`) } : undefined,
            name: data.filters.productName ? Like(`%${data.filters.productName}%`) : undefined
          }
        }
      },
      order: {
        createdAt: 'desc'
      },
      relations: {
        event: {
          product: {
            incentives: true,
            contract: true
          }
        },
        reservationPeoples: {
          passport: true
        }
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
