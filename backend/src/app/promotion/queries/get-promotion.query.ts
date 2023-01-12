import { IQuery } from '@nestjs/cqrs';

export class GetPromotionQuery implements IQuery {
  constructor(readonly id: string) {}
}
