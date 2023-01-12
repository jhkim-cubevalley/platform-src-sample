import { IQuery } from '@nestjs/cqrs';

export class GetUserByPhoneQuery implements IQuery {
  constructor(readonly phone: string) {}
}
