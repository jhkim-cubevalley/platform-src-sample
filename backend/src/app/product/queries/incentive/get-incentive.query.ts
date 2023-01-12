import { IQuery } from '@nestjs/cqrs';

export class GetIncentiveQuery implements IQuery {
  constructor(readonly id: number) {}
}
