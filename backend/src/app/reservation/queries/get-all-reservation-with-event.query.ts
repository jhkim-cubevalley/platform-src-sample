import { IQuery } from '@nestjs/cqrs';
import { EventStatus } from '../../event/domain/event.entity';

export class GetAllReservationWithEventQuery implements IQuery {
  constructor(
    readonly data: {
      readonly offset?: number;
      readonly limit?: number;
      readonly filters?: Partial<{
        readonly eventStatus: EventStatus;
        readonly dateFrom: Date;
        readonly dateTo: Date;
        readonly continentId: string;
        readonly countryId: string;
        readonly cityId: string;
        readonly departure: string;
        readonly cubeezName: string;
        readonly productName: string;
      }>;
    }
  ) {}
}
