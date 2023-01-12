import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { GetAllPointTransactionQuery } from '../queries/get-all-point-transaction.query';
import { PointTransaction } from '../domain/point-transaction.entity';

@Injectable()
@QueryHandler(GetAllPointTransactionQuery)
export class GetAllPointTransactionHandler implements IQueryHandler<GetAllPointTransactionQuery> {
  constructor(@InjectRepository(PointTransaction) private readonly repository: Repository<PointTransaction>) {}

  async execute({ data: { filters } }: GetAllPointTransactionQuery): Promise<PointTransaction[]> {
    const result = await this.repository.find({
      where: {
        user: filters.userName
          ? {
              name: filters.userName
            }
          : undefined,
        createdAt: filters.dateFrom
          ? Between(filters.dateFrom, dayjs(filters.dateTo).add(1, 'day').toDate())
          : undefined
      }
    });
    return result;
  }
}
