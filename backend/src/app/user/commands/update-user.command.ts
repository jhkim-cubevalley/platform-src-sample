import { ICommand } from '@nestjs/cqrs';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { EntityManager } from 'typeorm';
import { User } from '../domain/user.entity';

export class UpdateUserCommand implements ICommand {
  constructor(
    readonly uid: string,
    readonly data: QueryDeepPartialEntity<User>,
    readonly transaction?: EntityManager
  ) {}
}
