import { IQuery } from '@nestjs/cqrs';

export class GetMenuByNameQuery implements IQuery {
  constructor(readonly name: string, readonly isKo: boolean) {}
}
