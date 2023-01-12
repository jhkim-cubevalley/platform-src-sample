import { IQuery } from '@nestjs/cqrs';

export class GetFreeBoardReplyQuery implements IQuery {
  constructor(readonly id: number) {}
}
