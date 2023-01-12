import { IQuery } from '@nestjs/cqrs';
import GroupType from '../../../../infrastructure/common/types/group-type';

export class GetAllGroupQuery implements IQuery {
  constructor(
    readonly data: {
      readonly offset?: number;
      readonly limit?: number;
      readonly filters?: Partial<{
        readonly type: GroupType;
      }>;
    }
  ) {}
}
