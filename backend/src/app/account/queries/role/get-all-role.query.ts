import { IQuery } from '@nestjs/cqrs';

export class GetAllRoleQuery implements IQuery {
  constructor(
    readonly data: {
      readonly offset?: number;
      readonly limit?: number;
    }
  ) {}
}
