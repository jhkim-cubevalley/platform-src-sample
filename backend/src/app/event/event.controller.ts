import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  BadRequestException,
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Error } from '../../infrastructure/common/error';
import { TokenGuard } from '../../infrastructure/guards/token.guard';
import { RoleGuard } from '../../infrastructure/guards/role.guard';
import { Event, EventStatusKO } from './domain/event.entity';
import { GetEventQuery } from './queries/get-event.query';
import Pagination from '../../infrastructure/common/types/pagination-type';
import { GetAllEventQuery } from './queries/get-all-event.query';
import { GetAllEventDto } from './domain/get-all-event.dto';
import { Product } from '../product/domain/product/product.entity';
import { GetProductQuery } from '../product/queries/product/get-product.query';
import { CreateEventTypeDto } from './domain/create-event-type.dto';
import { CreateEventTypeCommand } from './commands/create-event-type.command';
import { EventMemo } from './domain/event-memo.entity';
import { AddEventMemoCommand } from './commands/add-event-memo.command';
import { GetAdminByEmailQuery } from '../admin/queries/get-admin-by-email.query';
import { AddEventMemoDto } from './domain/add-event-memo.dto';
import { DeleteEventMemoCommand } from './commands/delete-event-memo.command';
import { RequestEndEventCommand } from './commands/request-end-event.command';
import { EndEventCommand } from './commands/end-event.command';
import { EventStatusControlDto } from './domain/event-status-control.dto';
import { RequestUpdateEventCommand } from './commands/request-update-event.command';
import { RequestUpdateEventDto } from './domain/request-update-event.dto';
import { DenyUpdateEventCommand } from './commands/deny-update-event.command';
import { AddRequestEditFileCommand } from './commands/add-request-edit-file.command';
import { AddRequestEditFileDto } from './domain/add-request-edit-file.dto';
import { EventEditFile } from './domain/event-edit-file.entity';
import { SetEventTypeCommand } from './commands/set-event-type.command';
import { SetEventTypeDto } from './domain/set-event-type.dto';
import { AddHistoryCommand } from '../history/commands/add-history.command';
import { EventHistory } from './domain/event-history.entity';
import { DoneUpdateEventCommand } from './commands/done-update-event.command';
import { SetEventStatusDto } from './domain/set-event-status.dto';
import { SetEventStatusCommand } from './commands/set-event-status.command';

const whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
const fileUploadOption: MulterOptions = {
  limits: {
    fileSize: 10485760
  },
  fileFilter: (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      return cb(new BadRequestException(Error.NOT_ALLOW_FILE), false);
    }
    return cb(null, true);
  }
};

@ApiTags('event - ??????')
@UseInterceptors(CacheInterceptor)
@Controller('event')
export class EventController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @ApiOperation({ description: '????????? ???????????????.' })
  @Get('/:id')
  async get(@Req() req, @Param('id') id: number): Promise<Event> {
    const result = await this.queryBus.execute<unknown, Event>(new GetEventQuery(id));
    if (!result) throw new NotFoundException(Error.NOT_FOUND_EVENT);
    return result;
  }

  @ApiOperation({ description: '?????? ??????????????? ????????? ???????????????.' })
  @Get('/all/:id')
  async getAll(@Param('id') id: number, @Query() query: GetAllEventDto): Promise<Pagination<Event>> {
    const { offset, limit, type } = query;
    return this.queryBus.execute<unknown, Pagination<Event>>(
      new GetAllEventQuery({
        offset,
        limit,
        filters: {
          productId: id,
          type
        }
      })
    );
  }

  @ApiOperation({
    description: `
      ????????? ?????? ????????? ???????????????. A(?????? ??????) ????????? ???????????? ???????????? ?????????.
      (???????????? ??? ?????????????????? ????????? ???????????? ?????? ???????????? ????????? ??????????????????.)
    `
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['CUBEEZ', 'ADMIN']), RoleGuard([{ roleCode: '??????', canUpdate: true }]))
  @Post('/')
  async create(@Req() req, @Body() body: CreateEventTypeDto): Promise<Event[]> {
    const product = await this.queryBus.execute<unknown, Product>(new GetProductQuery(body.productId));
    if (!product) throw new NotFoundException(Error.NOT_FOUND_PRODUCT);
    if (req.decode.type === 'CUBEEZ') {
      if (product.cubeez?.email !== req.decode.email) throw new ForbiddenException(Error.PERMISSION_DENIED);
      if (product.status === 'approve') throw new BadRequestException(Error.CAN_NOT_CREATE_EVENT_TYPE);
    }
    return this.commandBus.execute(new CreateEventTypeCommand({ product, ...body }));
  }

  @ApiOperation({
    description: `?????? ????????? ???????????????. (???????????? ??? ????????? ?????? ???????????? ?????? ???????????? ????????? ??????????????????.)`
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['CUBEEZ', 'ADMIN']), RoleGuard([{ roleCode: '??????', canUpdate: true }]))
  @Put('/:id')
  async setEventType(@Req() req, @Param('id') id: number, @Body() body: SetEventTypeDto): Promise<boolean> {
    const event = await this.queryBus.execute<unknown, Event>(new GetEventQuery(id));
    if (!event) throw new NotFoundException(Error.NOT_FOUND_PRODUCT);
    if (req.decode.type === 'CUBEEZ') {
      if (event.product.cubeez?.email !== req.decode.email) throw new ForbiddenException(Error.PERMISSION_DENIED);
      if (event.product.status === 'approve') throw new BadRequestException(Error.CAN_NOT_CREATE_EVENT_TYPE);
    }
    await this.commandBus.execute(new SetEventTypeCommand({ eventId: id, eventTypeId: body.eventTypeId }));
    await this.commandBus.execute(
      new AddHistoryCommand({
        entity: EventHistory,
        title: `${event.product.name}??? ??????????????? ${req.decode.email}??? ?????? ?????? ???????????????.`,
        relation: {
          event: { id: event.id }
        }
      })
    );
    return true;
  }

  @ApiOperation({
    description: '?????? ????????? ???????????????.'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '??????', canUpdate: true }]))
  @Post('/memo')
  async addMemo(@Req() req, @Body() body: AddEventMemoDto): Promise<EventMemo> {
    const admin = await this.queryBus.execute(new GetAdminByEmailQuery(req.decode.email));
    if (!admin) throw new NotFoundException(Error.NOT_FOUND_ADMIN);
    return this.commandBus.execute(
      new AddEventMemoCommand({
        eventId: body.eventId,
        title: body.title,
        memo: body.memo,
        author: admin
      })
    );
  }

  @ApiOperation({
    description: '?????? ????????? ???????????????. ????????? ????????? ????????? ????????? ??? ????????????.'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '??????', canUpdate: true }]))
  @Delete('/memo/:id')
  async deleteMemo(@Req() req, @Param('id') id: string): Promise<boolean> {
    return this.commandBus.execute(new DeleteEventMemoCommand(id, req.decode.email));
  }

  @ApiOperation({
    description: '?????? ????????? ???????????????. ????????? ?????? ??????????????? ????????? ????????? ???????????????.'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['CUBEEZ']))
  @Post('/request/end/:id')
  async requestEnd(@Req() req, @Param('id') id: number): Promise<boolean> {
    const event = await this.queryBus.execute<unknown, Event>(new GetEventQuery(id));
    if (event.product.cubeez.email !== req.decode.email) throw new ForbiddenException(Error.PERMISSION_DENIED);
    return this.commandBus.execute(new RequestEndEventCommand(id));
  }

  @ApiOperation({
    description: '????????? ???????????????. (?????? ?????? ????????? ???????????????.)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '??????', canUpdate: true }]))
  @Post('/end/:id')
  async end(@Req() req, @Param('id') id: number, @Body() body: EventStatusControlDto): Promise<boolean> {
    await this.commandBus.execute(new EndEventCommand(id, body.adminMessage));
    await this.commandBus.execute(
      new AddHistoryCommand({
        entity: EventHistory,
        title: `${req.decode.email}??? ????????? ???????????????.`,
        message: body.adminMessage,
        relation: {
          event: { id }
        }
      })
    );
    return true;
  }

  @ApiOperation({
    description: '?????? ????????? ???????????????. ????????? ?????? ??????????????? ????????? ????????? ???????????????.'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['CUBEEZ']))
  @Post('/request/update/:id')
  async requestUpdate(@Req() req, @Param('id') id: number, @Body() body: RequestUpdateEventDto): Promise<boolean> {
    const event = await this.queryBus.execute<unknown, Event>(new GetEventQuery(id));
    if (event.product.cubeez.email !== req.decode.email) throw new ForbiddenException(Error.PERMISSION_DENIED);
    await this.commandBus.execute(new RequestUpdateEventCommand({ id, editMessage: body.editMessage }));
    await this.commandBus.execute(
      new AddHistoryCommand({
        entity: EventHistory,
        title: `${req.decode.email}??? ${event.product.name}??? ?????? ????????? ?????? ???????????????. ????????? ????????? ????????? ??? ????????? ???????????? ??? ??? ????????????.`,
        message: body.editMessage,
        relation: {
          event: { id: event.id }
        }
      })
    );
    return true;
  }

  @ApiOperation({
    description: '?????? ?????? ????????? ???????????????.'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '??????', canUpdate: true }]))
  @Post('/deny/update/:id')
  async denyUpdate(@Req() req, @Param('id') id: number, @Body() body: EventStatusControlDto): Promise<boolean> {
    await this.commandBus.execute(new DenyUpdateEventCommand(id, body.adminMessage));
    const event = await this.queryBus.execute<unknown, Event>(new GetEventQuery(id));
    await this.commandBus.execute(
      new AddHistoryCommand({
        entity: EventHistory,
        title: `${req.decode.email}??? ${event.product.name}??? ??????????????? ?????? ???????????????.`,
        message: body.adminMessage,
        relation: {
          event: { id: event.id }
        }
      })
    );
    return true;
  }

  @ApiOperation({
    description: '?????? ?????? ????????? ???????????????.'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '??????', canUpdate: true }]))
  @Post('/done/update/:id')
  async doneUpdate(@Req() req, @Param('id') id: number, @Body() body: EventStatusControlDto): Promise<boolean> {
    await this.commandBus.execute(new DoneUpdateEventCommand(id, body.adminMessage));
    const event = await this.queryBus.execute<unknown, Event>(new GetEventQuery(id));
    await this.commandBus.execute(
      new AddHistoryCommand({
        entity: EventHistory,
        title: `${req.decode.email}??? ${event.product.name}??? ????????? ?????? ???????????????.`,
        message: body.adminMessage,
        relation: {
          event: { id: event.id }
        }
      })
    );
    return true;
  }

  @ApiOperation({
    description: '?????? ?????? ?????? ??????????????? ??????????????????. ????????? ?????? ??????????????? ????????? ???????????? ???????????? ???????????????.'
  })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['CUBEEZ']))
  @Post('/upload/update/:id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }], fileUploadOption))
  async uploadUpdateFile(
    @Req() req,
    @UploadedFiles() file,
    @Param('id') id: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() _: AddRequestEditFileDto
  ): Promise<EventEditFile> {
    const event = await this.queryBus.execute<unknown, Event>(new GetEventQuery(id));
    if (event.product.cubeez.email !== req.decode.email) throw new ForbiddenException(Error.PERMISSION_DENIED);
    return this.commandBus.execute(
      new AddRequestEditFileCommand({
        id,
        file: file.image[0]
      })
    );
  }

  @ApiOperation({
    description: '?????? ????????? ???????????????.',
    summary: '?????????(??????)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '??????', canUpdate: true }]))
  @Post('/:id/status')
  async setStatus(@Req() req, @Param('id') id: number, @Body() body: SetEventStatusDto): Promise<boolean> {
    await this.commandBus.execute(
      new SetEventStatusCommand({
        eventId: id,
        status: body.status
      })
    );
    const event = await this.queryBus.execute(new GetEventQuery(id));
    await this.commandBus.execute(
      new AddHistoryCommand({
        entity: EventHistory,
        title: `${event.code}??? ${req.decode.email}??? ?????? ????????? ${EventStatusKO[body.status]}??? ?????? ???????????????.`,
        message: body.message,
        relation: {
          event: { id: event.id }
        }
      })
    );
    return true;
  }
}
