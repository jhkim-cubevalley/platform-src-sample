import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Badge } from '../../domain/badge/badge.entity';
import { GetAllBadgeQuery } from '../../queries/badge/get-all-badge.query';

@Injectable()
@QueryHandler(GetAllBadgeQuery)
export class GetAllBadgeHandler implements IQueryHandler<GetAllBadgeQuery> {
  constructor(@InjectRepository(Badge) private readonly badgeRepository: Repository<Badge>) {}

  async execute({ data }: GetAllBadgeQuery): Promise<Badge[]> {
    const { name } = data;
    const result = await this.badgeRepository.find({
      where: { name: name ? Like(`%${name}%`) : undefined },
      order: {
        createdAt: 'desc'
      },
      relations: {
        product: true,
        regionOne: true,
        regionTwo: true,
        regionThree: true
      }
    });
    return result;
  }
}
