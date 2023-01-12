import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TokenGuard } from '../../../infrastructure/guards/token.guard';
import Pagination from '../../../infrastructure/common/types/pagination-type';
import { RoleGuard } from '../../../infrastructure/guards/role.guard';
import { NoticeBoard } from './domain/notice-board.entity';
import { GetAllNoticeDto } from './domain/get-all-notice.dto';
import { GetAllNoticeQuery } from './queries/get-all-notice.query';
import { GetAdminByEmailQuery } from '../../admin/queries/get-admin-by-email.query';
import { WriteNoticeCommand } from './commands/write-notice.command';
import { AddAndUpdateNoticeDto } from './domain/add-and-update-notice.dto';
import { UpdateNoticeCommand } from './commands/update-notice.command';
import { DeleteNoticeCommand } from './commands/delete-notice.command';
import { GetNoticeQuery } from './queries/get-notice.query';
import { Error } from '../../../infrastructure/common/error';

@ApiTags('notice board - 공지사항 게시판')
@Controller('notice')
export class NoticeBoardController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @ApiOperation({
    description: '모든 공지사항 데이터를 가져옵니다. (프론트엔드에서 target에 따라서 데이터를 표시해야 합니다.)'
  })
  @Get('/')
  async getAll(@Req() req, @Query() query: GetAllNoticeDto): Promise<Pagination<NoticeBoard>> {
    return this.queryBus.execute<unknown, Pagination<NoticeBoard>>(
      new GetAllNoticeQuery({
        offset: query.offset,
        limit: query.limit,
        filters: { status: query.status, title: query.title }
      })
    );
  }

  @ApiOperation({
    description: '공지사항 데이터를 가져옵니다. (프론트엔드에서 target에 따라서 데이터를 표시해야 합니다.)'
  })
  @Get('/:id')
  async get(@Param('id') id: number): Promise<NoticeBoard> {
    const result = this.queryBus.execute(new GetNoticeQuery(id));
    if (!result) throw new NotFoundException(Error.NOT_FOUND_NOTICE);
    return result;
  }

  @ApiOperation({
    description: '새로운 공지사항을 생성합니다.'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '공지사항', canUpdate: true }]))
  @Post('/')
  async write(@Req() req, @Body() body: AddAndUpdateNoticeDto): Promise<NoticeBoard> {
    const admin = await this.queryBus.execute(new GetAdminByEmailQuery(req.decode.email));
    return this.commandBus.execute(
      new WriteNoticeCommand({
        title: body.title,
        content: body.content,
        target: body.target,
        status: body.status,
        author: admin
      })
    );
  }

  @ApiOperation({
    description: '공지사항을 수정합니다.'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '공지사항', canUpdate: true }]))
  @Put('/:id')
  async update(@Req() req, @Param('id') id: number, @Body() body: AddAndUpdateNoticeDto): Promise<boolean> {
    return this.commandBus.execute(
      new UpdateNoticeCommand(id, {
        title: body.title,
        content: body.content,
        target: body.target,
        status: body.status
      })
    );
  }

  @ApiOperation({
    description: '공지사항을 삭제합니다.'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '공지사항', canUpdate: true }]))
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<boolean> {
    return this.commandBus.execute(new DeleteNoticeCommand(id));
  }
}
