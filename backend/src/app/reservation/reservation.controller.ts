import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  CACHE_MANAGER,
  Controller,
  ForbiddenException,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiImplicitParam } from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';
import { Cache } from 'cache-manager';
import { TokenGuard } from '../../infrastructure/guards/token.guard';
import { Reservation } from './domain/reservation.entity';
import { GetAllReservationByBookerQuery } from './queries/get-all-reservation-by-booker.query';
import { RoleGuard } from '../../infrastructure/guards/role.guard';
import { GetReservationQuery } from './queries/get-reservation.query';
import { Error } from '../../infrastructure/common/error';
import { GetAllReservationByProductQuery } from './queries/get-all-reservation-by-product.query';
import { GetAllReservationDto } from './domain/get-all-reservation.dto';
import { GetAllReservationWithEventQuery } from './queries/get-all-reservation-with-event.query';
import Pagination from '../../infrastructure/common/types/pagination-type';
import { GetAllReservationWithEventDto } from './domain/get-all-reservation-with-event.dto';
import { CreateReservationCommand } from './commands/create-reservation.command';
import { CreateReservationDto } from './domain/create-reservation.dto';
import { UpdateReservationDto } from './domain/update-reservation.dto';
import { UpdateReservationCommand } from './commands/update-reservation.command';
import { RequestReservationCancelCommand } from './commands/request-reservation-cancel.command';
import { SendReservationMessageCommand } from './commands/send-reservation-message.command';
import { SendReservationMessageDto } from './domain/send-reservation-message.dto';
import { AgreeContractOfReservationCommand } from './commands/agree-contract-of-reservation.command';
import { SendReservationAgreeDto } from './domain/send-reservation-agree.dto';
import { SendAgreeMessageCommand } from './commands/send-agree-message.command';

@ApiTags('reservation - 상품 예약')
@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  @ApiOperation({
    description: '자신이 예약한 모든 여행상품을 가져옵니다. (단품. 호텔, 입장권 등은 추후 구현 예정)',
    summary: '고객'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['USER']))
  @Get('/me')
  async getMyData(@Req() req): Promise<Reservation[]> {
    return this.queryBus.execute<unknown, Reservation[]>(new GetAllReservationByBookerQuery(req.decode.email));
  }

  @ApiOperation({
    description: '예약 정보를 가져옵니다. 고객은 자신의 예약 정보만 가져올 수 있습니다.',
    summary: '고객, 관리자(예약)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['USER', 'ADMIN']), RoleGuard([{ roleCode: '예약', canAccess: true }]))
  @Get('/:id')
  async get(@Req() req, @Param('id') id: number): Promise<Reservation> {
    const result = await this.queryBus.execute<unknown, Reservation>(new GetReservationQuery(id));
    if (!result) throw new NotFoundException(Error.NOT_FOUND_RESERVATION);
    if (req.decode.type === 'USER' && result.bookerEmail !== req.decode.email) {
      throw new ForbiddenException(Error.PERMISSION_DENIED);
    }
    return result;
  }

  @ApiOperation({
    description: '여행상품에 등록된 모든 예약 정보를 가져옵니다. 예약취소 정보도 해당 API를 이용합니다.',
    summary: '관리자(예약)'
  })
  @ApiImplicitParam({
    name: 'id',
    description: '여행상품ID'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '예약', canAccess: true }]))
  @Get('/product/:id')
  async getAllByProduct(
    @Param('id') id: number,
    @Query() query: GetAllReservationDto
  ): Promise<Pagination<Reservation>> {
    return this.queryBus.execute(
      new GetAllReservationByProductQuery(id, {
        offset: query.offset,
        limit: query.limit,
        filters: {
          name: query.name,
          phone: query.phone,
          status: query.status
        }
      })
    );
  }

  @ApiOperation({
    description: '모든 예약 정보를 가져옵니다. (예약자 정보, 여행상품, 행사, 인센티브 내용이 함께 전달됩니다.)',
    summary: '관리자(예약)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '예약', canAccess: true }]))
  @Get('/')
  async getAll(@Query() query: GetAllReservationWithEventDto): Promise<Pagination<Reservation>> {
    return this.queryBus.execute(
      new GetAllReservationWithEventQuery({
        offset: query.offset,
        limit: query.limit,
        filters: {
          eventStatus: query.eventStatus,
          dateFrom: query.dateFrom ? new Date(query.dateFrom) : undefined,
          dateTo: query.dateTo ? new Date(query.dateTo) : undefined,
          continentId: query.continentId,
          countryId: query.countryId,
          cityId: query.cityId,
          departure: query.departure,
          cubeezName: query.cubeezName,
          productName: query.productName
        }
      })
    );
  }

  @ApiOperation({
    description: '새로운 예약 정보를 등록합니다. (고객일경우 토큰 정보와 예약자 정보를 검증합니다.)',
    summary: '고객, 관리자(예약)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['USER', 'ADMIN']), RoleGuard([{ roleCode: '예약', canUpdate: true }]))
  @Post('/')
  async create(@Req() req, @Body() body: CreateReservationDto): Promise<Reservation> {
    if (req.decode.type === 'USER' && req.decode.email !== body.bookerEmail) {
      throw new ForbiddenException(Error.PERMISSION_DENIED);
    }
    return this.commandBus.execute(
      new CreateReservationCommand({
        ...body,
        bookerBirthday: new Date(body.bookerBirthday),
        people: body.people.map((person) => ({
          ...person,
          birthday: new Date(person.birthday),
          passport: person.passport
            ? {
                ...person.passport,
                birthday: new Date(person.passport.birthday),
                passportExpire: new Date(person.passport.passportExpire)
              }
            : null
        }))
      })
    );
  }

  @ApiOperation({
    description: '예약 정보를 수정합니다.',
    summary: '관리자(예약)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '예약', canUpdate: true }]))
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() body: UpdateReservationDto): Promise<boolean> {
    return this.commandBus.execute(
      new UpdateReservationCommand(id, {
        ...body,
        bookerBirthday: body.bookerBirthday ? new Date(body.bookerBirthday) : undefined,
        people: body.people
          ? body.people.map((person) => ({
              ...person,
              passport: person.passport
                ? {
                    ...person.passport,
                    birthday: new Date(person.passport.birthday),
                    passportExpire: new Date(person.passport.passportExpire)
                  }
                : null
            }))
          : undefined
      })
    );
  }

  @ApiOperation({
    description: '예약 취소 요청을 합니다. (본인이 한 예약만 취소가 가능합니다.)',
    summary: '고객'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['USER']))
  @Post('/cancel/:id')
  async requestCancel(@Param('id') id: number): Promise<boolean> {
    return this.commandBus.execute(new RequestReservationCancelCommand(id));
  }

  @ApiOperation({
    description: '특정 예약자에게 예약 알림 메시지를 보냅니다. 시스템 메시지는 회원가입한 고객에게만 발송됩니다.',
    summary: '관리자(예약)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '예약', canUpdate: true }]))
  @Post('/send/message')
  async sendMessage(@Body() body: SendReservationMessageDto): Promise<boolean> {
    return this.commandBus.execute(
      new SendReservationMessageCommand({
        email: body.email,
        type: body.type
      })
    );
  }

  @ApiOperation({
    description: '예약자에게 계약서 동의 링크를 전송합니다.',
    summary: '관리자(예약)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '예약', canUpdate: true }]))
  @Post('/send/agree')
  async sendAgree(@Body() body: SendReservationAgreeDto): Promise<boolean> {
    return this.commandBus.execute(
      new SendAgreeMessageCommand({
        reservationId: body.reservationId,
        email: body.email,
        phone: body.phone
      })
    );
  }

  @ApiOperation({
    description: '예약자가 여행상품 계약을 동의할 때 사용합니다. (사용자가 사용할 수 있도록 GET 메소드를 사용합니다.)',
    summary: '고객, 동반자 등의 비로그인 고객'
  })
  @Get('/agree/user')
  async agreeUser(@Query('code') code: string): Promise<boolean> {
    const data = await this.cacheManager.get<{ reservationId: number; email: string }>(code);
    if (!data) throw new NotFoundException(Error.NOT_FOUND_AGREE_INFO);
    return this.commandBus.execute(new AgreeContractOfReservationCommand(data.reservationId, data.email));
  }
}
