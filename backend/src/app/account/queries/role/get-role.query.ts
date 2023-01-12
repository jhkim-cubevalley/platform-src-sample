import { IQuery } from '@nestjs/cqrs';

export class GetRoleQuery implements IQuery {
  constructor(readonly id: number) {}
}
