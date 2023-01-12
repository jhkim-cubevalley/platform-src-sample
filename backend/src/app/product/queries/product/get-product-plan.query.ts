import { IQuery } from '@nestjs/cqrs';

export class GetProductPlanQuery implements IQuery {
  constructor(readonly id: number) {}
}
