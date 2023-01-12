import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetAllCubeezSettlementQuery } from '../queries/get-all-cubeez-settlement.query';
import Pagination from '../../../infrastructure/common/types/pagination-type';
import { Event } from '../../event/domain/event.entity';

@Injectable()
@QueryHandler(GetAllCubeezSettlementQuery)
export class GetAllCubeezSettlementHandler implements IQueryHandler<GetAllCubeezSettlementQuery> {
  constructor(@InjectRepository(Event) private readonly repository: Repository<Event>) {}

  async execute({ data }: GetAllCubeezSettlementQuery): Promise<Pagination<Event>> {
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
        status: 'trip_end',
        product: {
          cubeez: {
            email: data.filters.cubeezEmail ? data.filters.cubeezEmail : undefined,
            name: data.filters.cubeezName ? Like(`%${data.filters.cubeezName}%`) : undefined
          },
          name: data.filters.productName ? Like(`%${data.filters.productName}%`) : undefined
        },
        settlementStatus: data.filters.status
      },
      relations: {
        product: {
          cubeez: true
        }
      }
    });

    return {
      data: result,
      pageTotal: result.length,
      total
    };
  }
}
