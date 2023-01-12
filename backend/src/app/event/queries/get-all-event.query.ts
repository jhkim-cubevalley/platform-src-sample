import { IQuery } from '@nestjs/cqrs';
import { EventStatus } from '../domain/event.entity';

export class GetAllEventQuery implements IQuery {
  constructor(
    readonly data: {
      readonly offset?: number;
      readonly limit?: number;
      readonly filters?: Partial<{
        readonly productId: number;
        readonly type: string;
        readonly cubeezName: string;
        readonly status: EventStatus;
      }>;
    }
  ) {}
}
