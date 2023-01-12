import { IQuery } from '@nestjs/cqrs';
import { SettlementStatus } from '../../event/domain/event.entity';

export class GetAllCubeezSettlementQuery implements IQuery {
  constructor(
    readonly data: {
      readonly offset: number;
      readonly limit: number;
      readonly filters: Partial<{
        readonly status: SettlementStatus;
        readonly cubeezEmail: string;
        readonly cubeezName: string;
        readonly productName: string;
      }>;
    }
  ) {}
}
