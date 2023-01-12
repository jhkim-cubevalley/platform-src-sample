import { IQuery } from '@nestjs/cqrs';

export class GetAllCouponQuery implements IQuery {
  constructor(
    readonly data: {
      readonly offset: number;
      readonly limit: number;
      readonly filters: Partial<{
        readonly isEnable: boolean;
        readonly onlyPartner: boolean;
      }>;
    }
  ) {}
}
