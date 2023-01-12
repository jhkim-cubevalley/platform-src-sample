import { IQuery } from '@nestjs/cqrs';

export class GetFreeBoardQuery implements IQuery {
  constructor(readonly id: number) {}
}
