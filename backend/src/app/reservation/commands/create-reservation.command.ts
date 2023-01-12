import { ICommand } from '@nestjs/cqrs';
import SexType from '../../../infrastructure/common/types/sex-type';
import { ReservationReferrer } from '../domain/reservation.entity';
import { PriceType } from '../domain/reservation-people.entity';

export interface CreateReservationPeopleInput {
  readonly isMaster: boolean;
  readonly name: string;
  readonly type: PriceType;
  readonly sex: SexType;
  readonly phone: string;
  readonly birthday: Date;
  readonly email: string;
  readonly passport?: {
    readonly birthday: Date;
    readonly country: string;
    readonly issue: string;
    readonly passportNumber: string;
    readonly passportExpire: Date;
  };
}

export class CreateReservationCommand implements ICommand {
  constructor(
    readonly data: {
      readonly eventId: number;
      readonly referrer: ReservationReferrer;
      readonly bookerName: string;
      readonly bookerBirthday: Date;
      readonly bookerSex: SexType;
      readonly bookerPhone: string;
      readonly bookerEmail: string;
      readonly people: Array<CreateReservationPeopleInput>;
      readonly price: number;
      readonly point: number;
      readonly couponCodes?: string[];
    }
  ) {}
}
