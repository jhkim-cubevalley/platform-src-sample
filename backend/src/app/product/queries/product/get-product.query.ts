import { IQuery } from '@nestjs/cqrs';

export class GetProductQuery implements IQuery {
  constructor(readonly id: number) {}
}
