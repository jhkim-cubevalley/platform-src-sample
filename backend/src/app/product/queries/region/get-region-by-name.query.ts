import { IQuery } from '@nestjs/cqrs';

export class GetRegionByNameQuery implements IQuery {
  constructor(readonly name: string) {}
}
