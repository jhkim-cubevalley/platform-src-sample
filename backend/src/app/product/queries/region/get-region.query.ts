import { IQuery } from '@nestjs/cqrs';

export class GetRegionQuery implements IQuery {
  constructor(readonly id: string) {}
}
