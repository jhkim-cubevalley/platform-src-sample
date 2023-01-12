import { IQuery } from '@nestjs/cqrs';

export class GetUserByNicknameQuery implements IQuery {
  constructor(readonly nickname: string) {}
}
