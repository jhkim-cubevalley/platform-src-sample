import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { TokenGuard } from '../../infrastructure/guards/token.guard';
import { Error } from '../../infrastructure/common/error';
import { Promotion } from './domain/promotion.entity';
import { GetAllPromotionDto } from './domain/get-all-promotion.dto';
import Pagination from '../../infrastructure/common/types/pagination-type';
import { GetAllPromotionQuery } from './queries/get-all-promotion.query';
import { RoleGuard } from '../../infrastructure/guards/role.guard';
import { CreatePromotionDto } from './domain/create-promotion.dto';
import { CreatePromotionCommand } from './commands/create-promotion.command';
import { UpdatePromotionDto } from './domain/update-promotion.dto';
import { UpdatePromotionCommand } from './commands/update-promotion.command';
import { DeletePromotionCommand } from './commands/delete-promotion.command';
import { GetPromotionQuery } from './queries/get-promotion.query';
import { StatReturnType } from './handlers/get-promotion-stat.handler';
import { GetPromotionStatQuery } from './queries/get-promotion-stat.query';

@ApiTags('promotion - 기획전, 이벤트, 기타 할인')
@Controller('promotion')
export class PromotionController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @ApiOperation({ description: '프로모션을 가져옵니다.', summary: '비로그인' })
  @Get('/:id')
  async get(@Param('id') id: string): Promise<Promotion> {
    const result = await this.queryBus.execute<unknown, Promotion>(new GetPromotionQuery(id));
    if (!result) throw new NotFoundException(Error.NOT_FOUND_PROMOTION);
    return result;
  }

  @ApiOperation({
    description: '모든 프로모션을 가져옵니다.',
    summary: '비로그인'
  })
  @Get('/')
  async getAll(@Query() query: GetAllPromotionDto): Promise<Pagination<Promotion>> {
    return this.queryBus.execute(
      new GetAllPromotionQuery({
        offset: query.offset,
        limit: query.limit,
        filters: {
          type: query.type,
          isEnable: query.isEnable ? query.isEnable === 'true' : undefined,
          sort: query.sort
        }
      })
    );
  }

  @ApiOperation({
    description: '새로운 프로모션을 만듭니다.'
  })
  @ApiBearerAuth()
  @UseGuards(
    TokenGuard(['ADMIN']),
    RoleGuard([
      { roleCode: '기획전', canUpdate: true },
      { roleCode: '이벤트', canUpdate: true }
    ])
  )
  @Post('/')
  async create(@Body() body: CreatePromotionDto): Promise<Promotion> {
    return this.commandBus.execute<unknown, Promotion>(new CreatePromotionCommand(body));
  }

  @ApiOperation({
    description: '프로모션을 수정합니다. 종류는 변경 불가능합니다.'
  })
  @ApiBearerAuth()
  @UseGuards(
    TokenGuard(['ADMIN']),
    RoleGuard([
      { roleCode: '기획전', canUpdate: true },
      { roleCode: '이벤트', canUpdate: true }
    ])
  )
  @Put('/:id')
  async update(@Param('id') id: string, @Body() body: UpdatePromotionDto): Promise<boolean> {
    return this.commandBus.execute(new UpdatePromotionCommand(id, body));
  }

  @ApiOperation({
    description: '프로모션을 삭제합니다.'
  })
  @ApiBearerAuth()
  @UseGuards(
    TokenGuard(['ADMIN']),
    RoleGuard([
      { roleCode: '기획전', canUpdate: true },
      { roleCode: '이벤트', canUpdate: true }
    ])
  )
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.commandBus.execute(new DeletePromotionCommand(id));
  }

  @ApiOperation({
    description: '프로모션 통계를 가져옵니다.',
    summary: '관리자(통계)'
  })
  @ApiImplicitQuery({
    name: 'productId',
    description: '상품ID',
    required: false
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '통계', canAccess: true }]))
  @Get('/stat/:id')
  async getStatistics(
    @Param('id') promotionId: string,
    @Query('productId') productId: number
  ): Promise<StatReturnType[]> {
    return this.queryBus.execute(
      new GetPromotionStatQuery({
        promotionId,
        productId
      })
    );
  }
}
