import { IQuery } from '@nestjs/cqrs';
import { HomeContentType } from '../domain/home-content.entity';

export class GetHomeContentQuery implements IQuery {
  constructor(readonly type: HomeContentType) {}
}
