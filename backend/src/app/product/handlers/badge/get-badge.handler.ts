import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetBadgeQuery } from '../../queries/badge/get-badge.query';
import { Badge } from '../../domain/badge/badge.entity';

@Injectable()
@QueryHandler(GetBadgeQuery)
export class GetBadgeHandler implements IQueryHandler<GetBadgeQuery> {
  constructor(@InjectRepository(Badge) private readonly badgeRepository: Repository<Badge>) {}

  async execute({ id }: GetBadgeQuery): Promise<Badge | undefined> {
    const result = await this.badgeRepository.findOne({
      where: { id },
      relations: {
        product: true,
        regionOne: true,
        regionTwo: true,
        regionThree: true
      }
    });
    if (!result) return undefined;
    return result;
  }
}
