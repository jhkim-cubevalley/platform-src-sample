import { IQuery } from '@nestjs/cqrs';

export class GetAllEventTypeByProductQuery implements IQuery {
  constructor(readonly productId: number) {}
}
