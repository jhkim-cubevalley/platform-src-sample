import { IQuery } from '@nestjs/cqrs';

export class GetRegionByCodeQuery implements IQuery {
  constructor(readonly code: string) {}
}
