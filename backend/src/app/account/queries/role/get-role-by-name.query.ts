import { IQuery } from '@nestjs/cqrs';

export class GetRoleByNameQuery implements IQuery {
  constructor(readonly name: string) {}
}
