import { IQuery } from '@nestjs/cqrs';

export class GetInquiryQuery implements IQuery {
  constructor(readonly id: number) {}
}
