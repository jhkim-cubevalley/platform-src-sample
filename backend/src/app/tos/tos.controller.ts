import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TokenGuard } from '../../infrastructure/guards/token.guard';
import { RoleGuard } from '../../infrastructure/guards/role.guard';
import { Error } from '../../infrastructure/common/error';
import { Tos } from './domain/tos.entity';
import { GetTosQuery } from './queries/get-tos.query';
import { GetAllTosQuery } from './queries/get-all-tos.query';
import { CreateTosDto } from './domain/create-tos.dto';
import { CreateTosCommand } from './commands/create-tos.command';
import { UpdateTosDto } from './domain/update-tos.dto';
import { UpdateTosCommand } from './commands/update-tos.command';
import { DeleteTosCommand } from './commands/delete-tos.command';

@ApiTags('tos - 약관')
@Controller('tos')
export class TosController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @ApiOperation({ description: '약관을 가져옵니다.' })
  @Get('/:id')
  async get(@Req() req, @Param('id') id: string): Promise<Tos> {
    const result = await this.queryBus.execute<unknown, Tos>(new GetTosQuery(id));
    if (!result) throw new NotFoundException(Error.NOT_FOUND_TOS);
    return result;
  }

  @ApiOperation({
    description: '모든 약관을 가져옵니다.'
  })
  @Get('/')
  async getAll(): Promise<Tos[]> {
    return this.queryBus.execute<unknown, Tos[]>(new GetAllTosQuery());
  }

  @ApiOperation({
    description: '새로운 약관을 만듭니다.'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '여행상품', canUpdate: true }]))
  @Post('/')
  async create(@Body() body: CreateTosDto): Promise<Tos> {
    return this.commandBus.execute<unknown, Tos>(new CreateTosCommand(body));
  }

  @ApiOperation({
    description: '약관을 수정합니다.'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '여행상품', canUpdate: true }]))
  @Put('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateTosDto): Promise<boolean> {
    return this.commandBus.execute(new UpdateTosCommand(id, body));
  }

  @ApiOperation({
    description: '약관을 삭제합니다.'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '여행상품', canUpdate: true }]))
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.commandBus.execute(new DeleteTosCommand(id));
  }
}
