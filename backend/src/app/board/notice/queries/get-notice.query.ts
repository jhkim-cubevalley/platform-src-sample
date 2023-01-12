import { IQuery } from '@nestjs/cqrs';

export class GetNoticeQuery implements IQuery {
  constructor(readonly id: number) {}
}
