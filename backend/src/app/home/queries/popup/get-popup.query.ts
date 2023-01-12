import { IQuery } from '@nestjs/cqrs';

export class GetPopupQuery implements IQuery {
  constructor(readonly id: string) {}
}
