import { IQuery } from '@nestjs/cqrs';
import { User } from '../../user/domain/user.entity';

export class GetSnsQuery implements IQuery {
  constructor(readonly user: User) {}
}
