import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetCubeezSettlementDetailQuery } from '../queries/get-cubeez-settlement-detail.query';
import { Promotion } from '../../promotion/domain/promotion.entity';
import { Error } from '../../../infrastructure/common/error';
import { Event } from '../../event/domain/event.entity';

export interface GetCubeezSettlementDetailReturnType {
  peopleLength: number;
  price: number;
  promotionPrice: number;
  promotions: Promotion[];
  commission: number;
  settlementPrice: number;
}

@Injectable()
@QueryHandler(GetCubeezSettlementDetailQuery)
export class GetCubeezSettlementDetailHandler implements IQueryHandler<GetCubeezSettlementDetailQuery> {
  constructor(@InjectRepository(Event) private readonly repository: Repository<Event>) {}

  async execute({ eventId }: GetCubeezSettlementDetailQuery): Promise<GetCubeezSettlementDetailReturnType[]> {
    const result = await this.repository.findOne({
      where: {
        id: eventId,
        status: 'trip_end'
      },
      relations: {
        reservations: {
          reservationPeoples: true
        },
        promotionProducts: true
      }
    });

    if (!result) throw new NotFoundException(Error.NOT_FOUND_RESERVATION);

    const details: GetCubeezSettlementDetailReturnType[] = result.reservations.map((reservation) => {
      const promotionPrice = result.promotionProducts
        .map((promotion) => {
          if (promotion.isPercent) {
            return reservation.price * (promotion.value / 100);
          }
          return promotion.value;
        })
        .reduce((a, b) => a + b, 0);
      const commission = reservation.price * ((result.product.cubeez?.group?.commissionMultiple ?? 0) / 100);

      return {
        peopleLength: reservation.reservationPeoples.length,
        price: reservation.price,
        promotionPrice,
        promotions: result.promotionProducts.map((i) => i.promotion),
        commission,
        settlementPrice: reservation.price - commission
      };
    });

    return details;
  }
}
