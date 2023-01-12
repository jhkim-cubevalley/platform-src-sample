import { IQuery } from '@nestjs/cqrs';

export class GetAllProductHistoryQuery implements IQuery {
  constructor(readonly productId: number) {}
}
