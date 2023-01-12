import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { PointConfig } from './domain/point-config.entity';
import { PointTransaction } from './domain/point-transaction.entity';
import { GetAllPointTransactionHandler } from './handlers/get-all-point-transaction.handler';
import { GetAllPointConfigHandler } from './handlers/get-all-point-config.handler';
import { AddPointTransactionHandler } from './handlers/add-point-transaction.handler';
import { GivePointHandler } from './handlers/give-point.handler';
import { SetPointConfigHandler } from './handlers/set-point-config.handler';
import { PointController } from './point.controller';

const handlers = [
  GetAllPointTransactionHandler,
  GetAllPointConfigHandler,
  AddPointTransactionHandler,
  GivePointHandler,
  SetPointConfigHandler
];

@Module({
  imports: [TypeOrmModule.forFeature([PointConfig, PointTransaction]), CqrsModule],
  providers: [...handlers],
  controllers: [PointController]
})
export class PointModule {}
