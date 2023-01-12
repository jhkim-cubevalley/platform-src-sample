import { IQuery } from '@nestjs/cqrs';

export class GetMenuByCodeQuery implements IQuery {
  constructor(readonly code: string) {}
}
