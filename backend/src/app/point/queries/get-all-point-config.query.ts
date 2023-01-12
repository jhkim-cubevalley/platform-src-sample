import { IQuery } from '@nestjs/cqrs';
import { PointConfigKey } from '../domain/point-config.entity';

export class GetAllPointConfigQuery implements IQuery {
  constructor(readonly type: PointConfigKey) {}
}
