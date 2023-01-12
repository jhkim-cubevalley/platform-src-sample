import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetAllCubeezSettlementHandler } from './handlers/get-all-cubeez-settlement.handler';
import { GetCubeezSettlementDetailHandler } from './handlers/get-cubeez-settlement-detail.handler';
import { RequestCubeezSettlementHandler } from './handlers/request-cubeez-settlement.handler';
import { SetCubeezSettlementStatusHandler } from './handlers/set-cubeez-settlement-status.handler';
import { PartnerSettlement } from './domain/partner-settlement.entity';
import { Event } from '../event/domain/event.entity';
import { GetAllPartnerSettlementHandler } from './handlers/get-all-partner-settlement.handler';
import { GetPartnerSettlementDetailHandler } from './handlers/get-partner-settlement-detail.handler';
import { CreatePartnerSettlementHandler } from './handlers/create-partner-settlement.handler';
import { DonePartnerSettlementHandler } from './handlers/done-partner-settlement.handler';
import { SettlementController } from './settlement.controller';

const handlers = [
  GetAllCubeezSettlementHandler,
  GetCubeezSettlementDetailHandler,
  RequestCubeezSettlementHandler,
  SetCubeezSettlementStatusHandler,
  GetAllPartnerSettlementHandler,
  GetPartnerSettlementDetailHandler,
  CreatePartnerSettlementHandler,
  DonePartnerSettlementHandler
];

@Module({
  /**
   * @title 큐비즈와 제휴파트너 정산 데이터 처리 방식
   * 큐비즈 정산은 큐비즈가 만든 행사에서 가져옵니다.
   * 제휴파트너 정산은 수동으로 추가한 파트너 정산 테이블에서 가져옵니다.
   */
  imports: [TypeOrmModule.forFeature([Event, PartnerSettlement]), CqrsModule],
  providers: [...handlers],
  controllers: [SettlementController]
})
export class SettlementModule {}
