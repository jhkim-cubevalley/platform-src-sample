import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountSns } from '../domain/account-sns.entity';
import { GetSnsQuery } from '../queries/get-sns.query';

@Injectable()
@QueryHandler(GetSnsQuery)
export class GetSnsHandler implements IQueryHandler<GetSnsQuery> {
  constructor(@InjectRepository(AccountSns) private readonly accountSnsRepository: Repository<AccountSns>) {}

  async execute(query: GetSnsQuery) {
    const { user } = query;

    const sns = await this.accountSnsRepository.find({ where: { user } });
    return sns;
  }
}
