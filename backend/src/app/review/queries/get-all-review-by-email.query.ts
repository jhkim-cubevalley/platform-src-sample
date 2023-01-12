import { IQuery } from '@nestjs/cqrs';

export class GetAllReviewByEmailQuery implements IQuery {
  constructor(readonly email: string) {}
}
