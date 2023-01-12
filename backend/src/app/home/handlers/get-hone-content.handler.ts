import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetHomeContentQuery } from '../queries/get-home-content.query';
import { HomeContent } from '../domain/home-content.entity';

@Injectable()
@QueryHandler(GetHomeContentQuery)
export class GetHoneContentHandler implements IQueryHandler<GetHomeContentQuery> {
  constructor(@InjectRepository(HomeContent) private readonly homeContentRepository: Repository<HomeContent>) {}

  async execute({ type }: GetHomeContentQuery): Promise<HomeContent | undefined> {
    const result = await this.homeContentRepository.findOne({ where: { type } });
    if (!result) return undefined;
    return result;
  }
}
