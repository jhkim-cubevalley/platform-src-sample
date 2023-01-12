import { IQuery } from '@nestjs/cqrs';

export class GetMenuQuery implements IQuery {
  constructor(readonly id: string) {}
}
