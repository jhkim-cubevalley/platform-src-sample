import { IQuery } from '@nestjs/cqrs';

export class GetAllUserQuery implements IQuery {
  constructor(
    readonly data: {
      readonly offset?: number;
      readonly limit?: number;
      readonly filters?: Partial<{
        readonly name: string;
        readonly nickname: string;
        readonly groupId: string;
        readonly createdFrom: Date;
        readonly createdTo: Date;
      }>;
    }
  ) {}
}
