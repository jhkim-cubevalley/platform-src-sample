import { IQuery } from '@nestjs/cqrs';
import { EntityTarget } from 'typeorm';
import { IHistory } from '../type/history-interface';

export class GetAllHistoryQuery implements IQuery {
  constructor(readonly entity: EntityTarget<IHistory>) {}
}
