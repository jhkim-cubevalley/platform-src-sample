import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Coupon } from './domain/coupon.entity';
import { CouponCode } from './domain/coupon-code.entity';
import { CouponTransaction } from './domain/coupon-transaction.entity';
import { GetCouponHandler } from './handlers/get-coupon.handler';
import { GetAllCouponHandler } from './handlers/get-all-coupon.handler';
import { GetAllCouponTransactionHandler } from './handlers/get-all-coupon-transaction.handler';
import { GetCouponByCodeHandler } from './handlers/get-coupon-by-code.handler';
import { CreateCouponHandler } from './handlers/create-coupon.handler';
import { UpdateCouponHandler } from './handlers/update-coupon.handler';
import { DeleteCouponHandler } from './handlers/delete-coupon.handler';
import { AddCouponTransactionHandler } from './handlers/add-coupon-transaction.handler';
import { GetCouponByEachCodeHandler } from './handlers/get-coupon-by-each-code.handler';
import { CouponController } from './coupon.controller';
import { GetCouponStatHandler } from './handlers/get-coupon-stat.handler';
import { GetCouponTransactionByUserHandler } from './handlers/get-coupon-transaction-by-user.handler';

const handlers = [
  GetCouponHandler,
  GetAllCouponHandler,
  GetAllCouponTransactionHandler,
  GetCouponByCodeHandler,
  GetCouponByEachCodeHandler,
  CreateCouponHandler,
  UpdateCouponHandler,
  DeleteCouponHandler,
  AddCouponTransactionHandler,
  GetCouponStatHandler,
  GetCouponTransactionByUserHandler
];

@Module({
  imports: [TypeOrmModule.forFeature([Coupon, CouponCode, CouponTransaction]), CqrsModule],
  providers: [...handlers],
  controllers: [CouponController]
})
export class CouponModule {}
