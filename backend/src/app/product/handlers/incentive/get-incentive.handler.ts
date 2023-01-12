import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetIncentiveQuery } from '../../queries/incentive/get-incentive.query';
import { Incentive } from '../../domain/incentive/incentive.entity';

@Injectable()
@QueryHandler(GetIncentiveQuery)
export class GetIncentiveHandler implements IQueryHandler<GetIncentiveQuery> {
  constructor(@InjectRepository(Incentive) private readonly incentiveRepository: Repository<Incentive>) {}

  async execute({ id }: GetIncentiveQuery): Promise<Incentive | undefined> {
    const result = await this.incentiveRepository.findOne({
      where: { id },
      relations: {
        user: true,
        region: true,
        manager: true,
        product: {
          events: {
            eventType: true
          }
        }
      }
    });
    if (!result) return undefined;
    return result;
  }
}
