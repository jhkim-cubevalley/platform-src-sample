import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TokenGuard } from '../../infrastructure/guards/token.guard';
import { RoleGuard } from '../../infrastructure/guards/role.guard';
import Pagination from '../../infrastructure/common/types/pagination-type';
import { Coupon } from './domain/coupon.entity';
import { CouponTransaction } from './domain/coupon-transaction.entity';
import { GetAllCouponDto } from './domain/get-all-coupon.dto';
import { GetAllCouponQuery } from './queries/get-all-coupon.query';
import { GetCouponQuery } from './queries/get-coupon.query';
import { Error } from '../../infrastructure/common/error';
import { GetAllCouponTransactionQuery } from './queries/get-all-coupon-transaction.query';
import { GetCouponTransactionDto } from './domain/get-coupon-transaction.dto';
import { DeleteCouponCommand } from './commands/delete-coupon.command';
import { CreateCouponDto } from './domain/create-coupon.dto';
import { CreateCouponCommand } from './commands/create-coupon.command';
import { UpdateCouponDto } from './domain/update-coupon.dto';
import { UpdateCouponCommand } from './commands/update-coupon.command';
import { GetCouponStatDto } from './domain/get-coupon-stat.dto';
import { GetCouponStatQuery } from './queries/get-coupon-stat.query';
import { GetCouponStatQueryReturnType } from './handlers/get-coupon-stat.handler';

@ApiTags('coupon - 쿠폰 관리')
@Controller('coupon')
export class CouponController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @ApiOperation({
    description: '모든 쿠폰을 가져옵니다.',
    summary: '관리자(쿠폰)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '쿠폰', canAccess: true }]))
  @Get('/')
  async getAll(@Query() query: GetAllCouponDto): Promise<Pagination<Coupon>> {
    return this.queryBus.execute<unknown, Pagination<Coupon>>(
      new GetAllCouponQuery({
        offset: query.offset,
        limit: query.offset,
        filters: {
          isEnable: query.isEnable ? query.isEnable === 'true' : undefined,
          onlyPartner: query.onlyPartner ? query.onlyPartner === 'true' : undefined
        }
      })
    );
  }

  @ApiOperation({
    description: '쿠폰을 가져옵니다.',
    summary: '관리자(쿠폰)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '쿠폰', canAccess: true }]))
  @Get('/:id')
  async get(@Param('id') id: string): Promise<Coupon> {
    const result = await this.queryBus.execute<unknown, Coupon | undefined>(new GetCouponQuery(id));
    if (!result) throw new NotFoundException(Error.NOT_FOUND_COUPON);
    return result;
  }

  @ApiOperation({
    description: '새로운 쿠폰을 생성합니다.',
    summary: '관리자(쿠폰)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '쿠폰', canUpdate: true }]))
  @Post('/')
  async create(@Body() body: CreateCouponDto): Promise<Coupon> {
    return this.commandBus.execute<unknown, Coupon>(
      new CreateCouponCommand({
        ...body,
        dateFrom: new Date(body.dateFrom),
        dateTo: new Date(body.dateTo)
      })
    );
  }

  @ApiOperation({
    description: '쿠폰을 수정합니다.',
    summary: '관리자(쿠폰)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '쿠폰', canUpdate: true }]))
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateCouponDto): Promise<boolean> {
    const coupon = await this.queryBus.execute(new GetCouponQuery(id));
    if (!coupon) throw new NotFoundException(Error.NOT_FOUND_COUPON);
    return this.commandBus.execute(
      new UpdateCouponCommand(coupon, {
        ...body,
        dateFrom: body.dateFrom ? new Date(body.dateFrom) : undefined,
        dateTo: body.dateTo ? new Date(body.dateTo) : undefined
      })
    );
  }

  @ApiOperation({
    description: '쿠폰을 삭제합니다.',
    summary: '관리자(쿠폰)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '쿠폰', canUpdate: true }]))
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    const coupon = await this.queryBus.execute<unknown, Coupon | undefined>(new GetCouponQuery(id));
    if (!coupon) throw new NotFoundException(Error.NOT_FOUND_COUPON);
    return this.commandBus.execute(new DeleteCouponCommand(coupon));
  }

  @ApiOperation({
    description: '쿠폰 사용내역을 가져옵니다.',
    summary: '관리자(쿠폰)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '쿠폰', canAccess: true }]))
  @Get('/:id/transaction')
  async getTransaction(
    @Param('id') id: string,
    @Query() query: GetCouponTransactionDto
  ): Promise<Pagination<CouponTransaction>> {
    return this.queryBus.execute<unknown, Pagination<CouponTransaction>>(
      new GetAllCouponTransactionQuery({
        offset: query.offset,
        limit: query.limit,
        filters: {
          couponId: id,
          userName: query.userName
        }
      })
    );
  }

  @ApiOperation({
    description: '쿠폰 통계를 불러옵니다.',
    summary: '관리자(쿠폰)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '쿠폰', canAccess: true }]))
  @Get('/:id/stat')
  async getStat(@Param('id') id: string, @Query() query: GetCouponStatDto): Promise<GetCouponStatQueryReturnType[]> {
    const coupon = await this.queryBus.execute<unknown, Coupon | undefined>(new GetCouponQuery(id));
    if (!coupon) throw new NotFoundException(Error.NOT_FOUND_COUPON);
    return this.queryBus.execute(
      new GetCouponStatQuery({
        coupon,
        filters: {
          dateFrom: query.dateFrom ? new Date(query.dateFrom) : undefined,
          dateTo: query.dateTo ? new Date(query.dateTo) : undefined
        }
      })
    );
  }
}
