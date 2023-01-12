import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ServerConfig } from './domain/server-config.entity';
import { ServerConfigController } from './server-config.controller';
import { UpsertServerConfigHandler } from './handlers/upsert-server-config.handler';
import { GetServerConfigHandler } from './handlers/get-server-config.handler';

const handlers = [UpsertServerConfigHandler, GetServerConfigHandler];

@Module({
  imports: [TypeOrmModule.forFeature([ServerConfig]), CqrsModule],
  providers: [...handlers],
  controllers: [ServerConfigController]
})
export class ServerConfigModule {}
