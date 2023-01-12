import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { TokenGuard } from '../../../infrastructure/guards/token.guard';
import { Error } from '../../../infrastructure/common/error';
import { RoleGuard } from '../../../infrastructure/guards/role.guard';
import { Badge } from '../domain/badge/badge.entity';
import { GetBadgeQuery } from '../queries/badge/get-badge.query';
import { GetAllBadgeQuery } from '../queries/badge/get-all-badge.query';
import { DeleteBadgeCommand } from '../commands/badge/delete-badge.command';
import { CreateBadgeDto } from '../domain/badge/create-badge.dto';
import { CreateBadgeCommand } from '../commands/badge/create-badge.command';

@ApiTags('badge - 뱃지 관리')
@Controller('badge')
export class BadgeController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @ApiOperation({ description: '뱃지를 가져옵니다.' })
  @Get('/:id')
  async get(@Req() req, @Param('id') id: string): Promise<Badge> {
    const result = await this.queryBus.execute<unknown, Badge>(new GetBadgeQuery(id));
    if (!result) throw new NotFoundException(Error.NOT_FOUND_BADGE);
    return result;
  }

  @ApiOperation({
    description: '모든 뱃지를 가져옵니다.'
  })
  @ApiImplicitQuery({
    name: 'name',
    description: '뱃지 이름 필터링',
    type: String,
    required: false
  })
  @Get('/')
  async getAll(@Query('name') name?: string): Promise<Badge[]> {
    return this.queryBus.execute<unknown, Badge[]>(
      new GetAllBadgeQuery({
        name
      })
    );
  }

  @ApiOperation({
    description: '새로운 뱃지를 만듭니다.'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '여행상품', canUpdate: true }]))
  @Post('/')
  async create(@Body() body: CreateBadgeDto): Promise<Badge> {
    return this.commandBus.execute<unknown, Badge>(new CreateBadgeCommand(body));
  }

  @ApiOperation({
    description: '뱃지를 삭제합니다.'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '여행상품', canUpdate: true }]))
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.commandBus.execute(new DeleteBadgeCommand(id));
  }
}
