import { IQuery } from '@nestjs/cqrs';
import { ServerConfigKey } from '../domain/server-config.entity';

export class GetServerConfigQuery implements IQuery {
  constructor(readonly key: ServerConfigKey) {}
}
