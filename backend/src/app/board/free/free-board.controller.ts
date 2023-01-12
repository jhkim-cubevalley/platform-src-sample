import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TokenGuard } from '../../../infrastructure/guards/token.guard';
import Pagination from '../../../infrastructure/common/types/pagination-type';
import { FreeBoard } from './domain/free-board.entity';
import { FreeBoardReply } from './domain/free-board-reply.entity';
import { GetAllFreeBoardDto } from './domain/get-all-free-board.dto';
import { GetAllFreeBoardQuery } from './queries/get-all-free-board.query';
import { GetFreeBoardQuery } from './queries/get-free-board.query';
import { Error } from '../../../infrastructure/common/error';
import { WriteFreeBoardDto } from './domain/write-free-board.dto';
import { GetUserByEmailQuery } from '../../user/queries/get-user-by-email.query';
import { WriteFreeBoardCommand } from './commands/write-free-board.command';
import { UpdateFreeBoardCommand } from './commands/update-free-board.command';
import { UpdateFreeBoardDto } from './domain/update-free-board.dto';
import { DeleteFreeBoardCommand } from './commands/delete-free-board.command';
import { WriteFreeBoardReplyDto } from './domain/write-free-board-reply.dto';
import { WriteFreeBoardReplyCommand } from './commands/write-free-board-reply.command';
import { GetFreeBoardReplyQuery } from './queries/get-free-board-reply.query';
import { UpdateFreeBoardReplyDto } from './domain/update-free-board-reply.dto';
import { UpdateFreeBoardReplyCommand } from './commands/update-free-board-reply.command';
import { DeleteFreeBoardReplyCommand } from './commands/delete-free-board-reply.command';
import { IncreaseFreeBoardViewcountCommand } from './commands/increase-free-board-viewcount.command';

@ApiTags('free board - 자유게시판')
@Controller('free')
export class FreeBoardController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @ApiOperation({
    description: '모든 자유게시판의 게시글을 가져옵니다.',
    summary: '고객, 큐비즈, 관리자'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['USER', 'CUBEEZ', 'ADMIN']))
  @Get('/')
  async getAll(@Query() query: GetAllFreeBoardDto): Promise<Pagination<FreeBoard>> {
    return this.queryBus.execute(
      new GetAllFreeBoardQuery({
        offset: query.offset,
        limit: query.limit,
        filters: {
          title: query.title,
          authorName: query.authorName,
          dateFrom: query.dateFrom ? new Date(query.dateFrom) : undefined,
          dateTo: query.dateTo ? new Date(query.dateTo) : undefined
        }
      })
    );
  }

  @ApiOperation({
    description: '자유게시판의 게시글을 가져옵니다.',
    summary: '고객, 큐비즈, 관리자'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['USER', 'CUBEEZ', 'ADMIN']))
  @Get('/:id')
  async get(@Param('id') id: number): Promise<FreeBoard> {
    const result = await this.queryBus.execute(new GetFreeBoardQuery(id));
    if (!result) throw new NotFoundException(Error.NOT_FOUND_FREE_BOARD);
    await this.commandBus.execute(new IncreaseFreeBoardViewcountCommand(id));
    return result;
  }

  @ApiOperation({
    description: '자유게시판의 게시글을 작성합니다.',
    summary: '고객'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['USER']))
  @Post('/')
  async createBoard(@Req() req, @Body() body: WriteFreeBoardDto): Promise<FreeBoard> {
    const user = await this.queryBus.execute(new GetUserByEmailQuery(req.decode.email));
    return this.commandBus.execute(
      new WriteFreeBoardCommand({
        ...body,
        author: user.uid
      })
    );
  }

  @ApiOperation({
    description: '자유게시판의 게시글을 수정합니다. (내 게시글만 수정할 수 있습니다.)',
    summary: '고객'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['USER']))
  @Patch('/:id')
  async updateBoard(@Req() req, @Param('id') id: number, @Body() body: UpdateFreeBoardDto): Promise<boolean> {
    const board = await this.queryBus.execute(new GetFreeBoardQuery(id));
    if (!board) throw new NotFoundException(Error.NOT_FOUND_FREE_BOARD);
    if (board.author.email !== req.decode.email) throw new ForbiddenException(Error.PERMISSION_DENIED);
    return this.commandBus.execute(
      new UpdateFreeBoardCommand(id, {
        ...body
      })
    );
  }

  @ApiOperation({
    description: '자유게시판의 게시글을 삭제합니다. (고객은 내 게시글만 수정할 수 있습니다.)',
    summary: '고객, 관리자'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['USER', 'ADMIN']))
  @Delete('/:id')
  async deleteBoard(@Req() req, @Param('id') id: number): Promise<boolean> {
    const board = await this.queryBus.execute(new GetFreeBoardQuery(id));
    if (!board) throw new NotFoundException(Error.NOT_FOUND_FREE_BOARD);
    if (req.decode.type === 'USER') {
      if (board.author.email !== req.decode.email) throw new ForbiddenException(Error.PERMISSION_DENIED);
    }
    return this.commandBus.execute(new DeleteFreeBoardCommand(id));
  }

  @ApiOperation({
    description: '자유게시판의 게시글에 댓글을 작성합니다.',
    summary: '고객'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['USER']))
  @Post('/reply')
  async createReply(@Req() req, @Body() body: WriteFreeBoardReplyDto): Promise<FreeBoardReply> {
    const user = await this.queryBus.execute(new GetUserByEmailQuery(req.decode.email));
    return this.commandBus.execute(
      new WriteFreeBoardReplyCommand({
        ...body,
        author: user.uid
      })
    );
  }

  @ApiOperation({
    description: '자유게시판의 게시글에 댓글을 수정합니다. (내 댓글만 수정할 수 있습니다.)',
    summary: '고객'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['USER']))
  @Patch('/reply/:id')
  async updateReply(@Req() req, @Param('id') id: number, @Body() body: UpdateFreeBoardReplyDto): Promise<boolean> {
    const reply = await this.queryBus.execute(new GetFreeBoardReplyQuery(id));
    if (!reply) throw new NotFoundException(Error.NOT_FOUND_FREE_BOARD_REPLY);
    if (reply.author.email !== req.decode.email) throw new ForbiddenException(Error.PERMISSION_DENIED);
    return this.commandBus.execute(
      new UpdateFreeBoardReplyCommand(id, {
        ...body
      })
    );
  }

  @ApiOperation({
    description: '자유게시판의 게시글에 댓글을 삭제합니다. (고객은 내 댓글만 수정할 수 있습니다.)',
    summary: '고객, 관리자'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['USER', 'ADMIN']))
  @Delete('/reply/:id')
  async deleteReply(@Req() req, @Param('id') id: number): Promise<boolean> {
    const reply = await this.queryBus.execute(new GetFreeBoardReplyQuery(id));
    if (!reply) throw new NotFoundException(Error.NOT_FOUND_FREE_BOARD_REPLY);
    if (req.decode.type === 'USER') {
      if (reply.author.email !== req.decode.email) throw new ForbiddenException(Error.PERMISSION_DENIED);
    }
    return this.commandBus.execute(new DeleteFreeBoardReplyCommand(id));
  }
}
