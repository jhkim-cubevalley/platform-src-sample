import { IQuery } from '@nestjs/cqrs';

export class GetAllCubeezQuery implements IQuery {
  constructor(
    readonly data: {
      readonly offset?: number;
      readonly limit?: number;
      readonly filters?: Partial<{
        readonly isApprove: boolean;
        readonly isBusiness: boolean;
        readonly name: string;
        readonly nickOrBusinessName: string;
        readonly createdFrom: Date;
        readonly createdTo: Date;
        readonly manageGroupId: string;
        readonly onlyRequestApprove: boolean;
      }>;
    }
  ) {}
}
