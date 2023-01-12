import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Pagination from '../../../infrastructure/common/types/pagination-type';
import { GetAllPartnerSettlementQuery } from '../queries/get-all-partner-settlement.query';
import { PartnerSettlement } from '../domain/partner-settlement.entity';

@Injectable()
@QueryHandler(GetAllPartnerSettlementQuery)
export class GetAllPartnerSettlementHandler implements IQueryHandler<GetAllPartnerSettlementQuery> {
  constructor(@InjectRepository(PartnerSettlement) private readonly repository: Repository<PartnerSettlement>) {}

  async execute({ data }: GetAllPartnerSettlementQuery): Promise<Pagination<PartnerSettlement>> {
    const { offset, limit } = data;
    let pageOption = {};
    if (offset && limit) {
      pageOption = {
        take: limit,
        skip: limit * (offset - 1)
      };
    }

    const [result, total] = await this.repository.findAndCount({
      ...pageOption,
      where: {
        partner: {
          name: data.filters.partnerName ? Like(`%${data.filters.partnerName}%`) : undefined
        },
        event: {
          product: {
            name: data.filters.productName ? Like(`%${data.filters.productName}%`) : undefined
          },
          startDate: data.filters.startDate
        },
        settlementStatus: data.filters.status
      },
      relations: {
        event: {
          product: true
        },
        partner: true
      }
    });

    return {
      data: result,
      pageTotal: result.length,
      total
    };
  }
}
