import { IQuery } from '@nestjs/cqrs';

export class GetPartnerSettlementDetailQuery implements IQuery {
  constructor(readonly id: string) {}
}
