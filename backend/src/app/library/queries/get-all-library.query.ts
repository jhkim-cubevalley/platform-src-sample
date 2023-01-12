import { IQuery } from '@nestjs/cqrs';
import GroupType from '../../../infrastructure/common/types/group-type';

export class GetAllLibraryQuery implements IQuery {
  constructor(
    readonly data: {
      readonly offset?: number;
      readonly limit?: number;
      readonly filters?: Partial<{
        readonly status: 'all' | 'me' | 'admin';
        readonly name: string;
        readonly createdFrom: Date;
        readonly createdTo: Date;
        readonly continent: string;
        readonly country: string;
        readonly city: string;
        readonly cubeezName: string;
      }>;
    },
    readonly account: {
      readonly email: string;
      readonly type: GroupType;
    }
  ) {}
}
