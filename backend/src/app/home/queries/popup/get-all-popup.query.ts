import { IQuery } from '@nestjs/cqrs';

export class GetAllPopupQuery implements IQuery {
  constructor(
    readonly data: {
      readonly offset?: number;
      readonly limit?: number;
      readonly filters?: Partial<{
        readonly isEnable: boolean;
      }>;
    }
  ) {}
}
