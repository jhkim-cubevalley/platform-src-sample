import { IQuery } from '@nestjs/cqrs';

export class GetContractByNameQuery implements IQuery {
  constructor(readonly name: string) {}
}
