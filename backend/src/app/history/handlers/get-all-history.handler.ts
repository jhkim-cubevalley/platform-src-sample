import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Connection } from 'typeorm';
import { GetAllHistoryQuery } from '../queries/get-all-history.query';
import { IHistory } from '../type/history-interface';

@Injectable()
@QueryHandler(GetAllHistoryQuery)
export class GetAllHistoryHandler implements IQueryHandler<GetAllHistoryQuery> {
  constructor(private readonly connection: Connection) {}

  async execute({ entity }: GetAllHistoryQuery): Promise<IHistory[]> {
    return this.connection.manager.find(entity);
  }
}
