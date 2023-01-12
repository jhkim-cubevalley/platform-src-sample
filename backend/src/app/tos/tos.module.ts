import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Tos } from './domain/tos.entity';
import { GetTosHandler } from './handlers/get-tos.handler';
import { GetAllTosHandler } from './handlers/get-all-tos.handler';
import { GetTosByNameHandler } from './handlers/get-tos-by-name.handler';
import { CreateTosHandler } from './handlers/create-tos.handler';
import { UpdateTosHandler } from './handlers/update-tos.handler';
import { DeleteTosHandler } from './handlers/delete-tos.handler';
import { TosController } from './tos.controller';

const tosHandlers = [
  GetTosHandler,
  GetAllTosHandler,
  GetTosByNameHandler,
  CreateTosHandler,
  UpdateTosHandler,
  DeleteTosHandler
];

@Module({
  imports: [TypeOrmModule.forFeature([Tos]), CqrsModule],
  providers: [...tosHandlers],
  controllers: [TosController]
})
export class TosModule {}
