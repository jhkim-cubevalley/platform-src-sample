import { ICommand } from '@nestjs/cqrs';
import { Event } from '../../event/domain/event.entity';

export class ValidatePriceCommand implements ICommand {
  constructor(
    readonly data: {
      readonly userUid: string;
      readonly event: Event;
      readonly people: {
        readonly adult: number;
        readonly teen: number;
        readonly kid: number;
      };
      readonly price: number;
      readonly extra: Partial<{
        readonly havePoint: number;
        readonly usePoint: number;
        readonly couponCodes: string[];
      }>;
    }
  ) {}
}
