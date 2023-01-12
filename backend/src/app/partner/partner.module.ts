import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Partner } from './domain/partner.entity';
import { PartnerCommission } from './domain/partner-commission.entity';
import { PartnerDocument } from './domain/partner-document.entity';
import { PartnerMemo } from './domain/partner-memo.entity';
import { PartnerGroup } from './domain/partner-group.entity';
import { GetPartnerHandler } from './handlers/get-partner.handler';
import { GetAllPartnerHandler } from './handlers/get-all-partner.handler';
import { CreatePartnerHandler } from './handlers/create-partner.handler';
import { UpdatePartnerHandler } from './handlers/update-partner.handler';
import { DeletePartnerHandler } from './handlers/delete-partner.handler';
import { GetPartnerGroupHandler } from './handlers/get-partner-group.handler';
import { GetAllPartnerGroupHandler } from './handlers/get-all-partner-group.handler';
import { CreatePartnerGroupHandler } from './handlers/create-partner-group.handler';
import { UpdatePartnerGroupHandler } from './handlers/update-partner-group.handler';
import { DeletePartnerGroupHandler } from './handlers/delete-partner-group.handler';
import { AddMemoToPartnerHandler } from './handlers/add-memo-to-partner.handler';
import { GetPartnerDocumentHandler } from './handlers/get-partner-document.handler';
import { AddPartnerDocumentHandler } from './handlers/add-partner-document.handler';
import { PartnerController } from './controllers/partner.controller';
import { PartnerGroupController } from './controllers/partner-group.controller';

const handlers = [
  GetPartnerHandler,
  GetAllPartnerHandler,
  GetPartnerGroupHandler,
  GetAllPartnerGroupHandler,
  CreatePartnerHandler,
  UpdatePartnerHandler,
  DeletePartnerHandler,
  CreatePartnerGroupHandler,
  UpdatePartnerGroupHandler,
  DeletePartnerGroupHandler,
  AddMemoToPartnerHandler,
  GetPartnerDocumentHandler,
  AddPartnerDocumentHandler
];

@Module({
  imports: [
    TypeOrmModule.forFeature([Partner, PartnerCommission, PartnerDocument, PartnerMemo, PartnerGroup]),
    CqrsModule
  ],
  providers: [...handlers],
  controllers: [PartnerController, PartnerGroupController]
})
export class PartnerModule {}
