import { IQuery } from '@nestjs/cqrs';

export class GetContractQuery implements IQuery {
  constructor(readonly id: number) {}
}
