import { ICommand } from '@nestjs/cqrs';
import SexType from '../../../infrastructure/common/types/sex-type';
import { InsuranceStatus, RefundStatus, ReservationStatus } from '../domain/reservation.entity';
import { PriceType } from '../domain/reservation-people.entity';

export interface UpdateReservationPeopleInput {
  readonly isMaster: boolean;
  readonly name: string;
  readonly sex: SexType;
  readonly phone: string;
  readonly email: string;
  readonly rnnFirst: string;
  readonly rnnSecond: string;
  readonly status: ReservationStatus;
  readonly priceType: PriceType;
  readonly paymentPrice: number;
  readonly insuranceStatus: InsuranceStatus;
  readonly isContractAgree: boolean;
  readonly memo: string;
  readonly passport?: {
    readonly birthday: Date;
    readonly country: string;
    readonly issue: string;
    readonly passportNumber: string;
    readonly passportExpire: Date;
  };
}

interface UpdateReservationCommandInput {
  readonly bookerName: string;
  readonly bookerBirthday: Date;
  readonly bookerSex: SexType;
  readonly bookerPhone: string;
  readonly bookerEmail: string;
  readonly price: number;
  readonly afterPrice: number;
  readonly beforePrice: number;
  readonly status: ReservationStatus;
  readonly insuranceStatus: InsuranceStatus;
  readonly refundStatus: RefundStatus;
  readonly memo: string;
  readonly people: Array<UpdateReservationPeopleInput>;
}

export class UpdateReservationCommand implements ICommand {
  constructor(readonly id: number, readonly data: Partial<UpdateReservationCommandInput>) {}
}
