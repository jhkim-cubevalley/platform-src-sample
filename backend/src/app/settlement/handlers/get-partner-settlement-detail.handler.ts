import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Error } from '../../../infrastructure/common/error';
import { GetPartnerSettlementDetailQuery } from '../queries/get-partner-settlement-detail.query';
import { PartnerSettlement } from '../domain/partner-settlement.entity';

export interface GetPartnerSettlementDetailReturnType {
  productName: string;
  description: string;
  price: number;
  commission: number;
  settlementPrice: number;
}

@Injectable()
@QueryHandler(GetPartnerSettlementDetailQuery)
export class GetPartnerSettlementDetailHandler implements IQueryHandler<GetPartnerSettlementDetailQuery> {
  constructor(@InjectRepository(PartnerSettlement) private readonly repository: Repository<PartnerSettlement>) {}

  async execute({ id }: GetPartnerSettlementDetailQuery): Promise<GetPartnerSettlementDetailReturnType> {
    const result = await this.repository.findOne({
      where: {
        id,
        event: {
          status: 'trip_end'
        }
      },
      relations: {
        event: {
          product: true
        },
        partner: true
      }
    });

    if (!result) throw new NotFoundException(Error.NOT_FOUND_PARTNER_SETTLEMENT);

    const partnerPolicy = result.partner.commissions.map(({ percent }) => percent).reduce((a, b) => a + b, 0);
    const commission = result.price * ((partnerPolicy ?? 0) / 100);

    return {
      productName: result.event.product.name,
      description: '내용',
      price: result.price,
      commission,
      settlementPrice: result.price - commission
    };
  }
}
