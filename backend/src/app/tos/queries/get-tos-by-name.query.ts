import { IQuery } from '@nestjs/cqrs';

export class GetTosByNameQuery implements IQuery {
  constructor(readonly name: string) {}
}
