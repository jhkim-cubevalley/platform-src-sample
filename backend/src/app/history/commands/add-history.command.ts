import { ICommand } from '@nestjs/cqrs';
import { EntityTarget } from 'typeorm';
import { IHistory } from '../type/history-interface';

export class AddHistoryCommand implements ICommand {
  constructor(
    readonly data: {
      entity: EntityTarget<IHistory>;
      title: string;
      relation: any;
      message?: string;
    }
  ) {}
}
