import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Reservation } from './domain/reservation.entity';
import { ReservationPeople } from './domain/reservation-people.entity';
import { Passport } from './domain/passport.entity';
import { GetAllReservationByProductHandler } from './handlers/get-all-reservation-by-product.handler';
import { GetReservationHandler } from './handlers/get-reservation.handler';
import { CreateReservationHandler } from './handlers/create-reservation.handler';
import { UpdateReservationHandler } from './handlers/update-reservation.handler';
import { RequestReservationCancelHandler } from './handlers/request-reservation-cancel.handler';
import { SendReservationMessageHandler } from './handlers/send-reservation-message.handler';
import { GetAllReservationByBookerHandler } from './handlers/get-all-reservation-by-booker.handler';
import { ReservationController } from './reservation.controller';
import { GetAllReservationWithEventHandler } from './handlers/get-all-reservation-with-event.handler';
import { SendAgreeMessageHandler } from './handlers/send-agree-message.handler';
import { AgreeContractOfReservationHandler } from './handlers/agree-contract-of-reservation.handler';
import { ValidatePriceHandler } from './handlers/validate-price.handler';

const handlers = [
  GetAllReservationByProductHandler,
  GetAllReservationByBookerHandler,
  GetAllReservationWithEventHandler,
  GetReservationHandler,
  CreateReservationHandler,
  UpdateReservationHandler,
  RequestReservationCancelHandler,
  SendReservationMessageHandler,
  SendAgreeMessageHandler,
  AgreeContractOfReservationHandler,
  ValidatePriceHandler
];

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, ReservationPeople, Passport]), CqrsModule],
  providers: [...handlers],
  controllers: [ReservationController]
})
export class ReservationModule {}
