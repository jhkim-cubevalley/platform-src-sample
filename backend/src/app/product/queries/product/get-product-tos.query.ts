import { IQuery } from '@nestjs/cqrs';

export class GetProductTosQuery implements IQuery {
  constructor(readonly id: number) {}
}
