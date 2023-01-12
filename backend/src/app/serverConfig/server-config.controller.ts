import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { TokenGuard } from '../../infrastructure/guards/token.guard';
import { RoleGuard } from '../../infrastructure/guards/role.guard';
import { UpsertServerConfigDto } from './domain/upsert-server-config.dto';
import { ServerConfig, ServerConfigKey } from './domain/server-config.entity';
import { GetServerConfigQuery } from './queries/get-server-config.query';
import { UpsertServerConfigCommand } from './commands/upsert-server-config.command';

@ApiTags('server config - 서버 설정')
@Controller('serverconfig')
export class ServerConfigController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @ApiOperation({
    description: '서버설정 값을 가져옵니다.',
    summary: '관리자(마스터)'
  })
  @ApiImplicitQuery({
    name: 'key',
    description: '설정 키',
    enum: ['AFTER_PRICE_RATE', 'BEFORE_PRICE_RATE']
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '마스터', canAccess: true }]))
  @Get('/')
  async get(@Query('key') key: ServerConfigKey): Promise<string> {
    return this.queryBus.execute(new GetServerConfigQuery(key));
  }

  @ApiOperation({
    description: '서버설정 값을 변경합니다.',
    summary: '관리자(마스터)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '마스터', canUpdate: true }]))
  @Post('/')
  async upsert(@Body() body: UpsertServerConfigDto): Promise<ServerConfig> {
    return this.commandBus.execute(new UpsertServerConfigCommand({ key: body.key, value: body.value }));
  }
}
