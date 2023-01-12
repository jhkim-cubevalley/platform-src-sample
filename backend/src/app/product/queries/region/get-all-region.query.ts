import { IQuery } from '@nestjs/cqrs';

export class GetAllRegionQuery implements IQuery {
  constructor(
    readonly data: {
      readonly offset?: number;
      readonly limit?: number;
    }
  ) {}
}
