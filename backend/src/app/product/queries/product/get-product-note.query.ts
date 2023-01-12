import { IQuery } from '@nestjs/cqrs';

export class GetProductNoteQuery implements IQuery {
  constructor(readonly id: number) {}
}
