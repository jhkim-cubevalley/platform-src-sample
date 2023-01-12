import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TokenGuard } from '../../../infrastructure/guards/token.guard';
import { Error } from '../../../infrastructure/common/error';
import Pagination from '../../../infrastructure/common/types/pagination-type';
import { RoleGuard } from '../../../infrastructure/guards/role.guard';
import { Popup } from '../domain/popup/popup.entity';
import { GetAllPopupQuery } from '../queries/popup/get-all-popup.query';
import { GetAllPopupDto } from '../domain/popup/get-all-popup.dto';
import { GetPopupQuery } from '../queries/popup/get-popup.query';
import { DeletePopupCommand } from '../commands/popup/delete-popup.command';
import { CreatePopupDto } from '../domain/popup/create-popup.dto';
import { CreatePopupCommand } from '../commands/popup/create-popup.command';
import { UpdatePopupDto } from '../domain/popup/update-popup.dto';
import { UpdatePopupCommand } from '../commands/popup/update-popup.command';

@ApiTags('popup - 팝업 관리')
@Controller('popup')
export class PopupController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @ApiOperation({
    description: '모든 팝업을 가져옵니다.'
  })
  @Get('/')
  async getAll(@Query() query: GetAllPopupDto): Promise<Pagination<Popup>> {
    return this.queryBus.execute<unknown, Pagination<Popup>>(
      new GetAllPopupQuery({
        offset: query.offset,
        limit: query.limit,
        filters: {
          isEnable: query.isEnable ? query.isEnable === 'true' : undefined
        }
      })
    );
  }

  @ApiOperation({ description: '팝업을 가져옵니다.' })
  @Get('/:id')
  async get(@Param('id') id: string): Promise<Popup> {
    const result = await this.queryBus.execute<unknown, Popup>(new GetPopupQuery(id));
    if (!result) throw new NotFoundException(Error.NOT_FOUND_POPUP);
    return result;
  }

  @ApiOperation({
    description: '새로운 팝업을 만듭니다.',
    summary: '관리자(팝업)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '팝업', canUpdate: true }]))
  @Post('/')
  async create(@Body() body: CreatePopupDto): Promise<Popup> {
    return this.commandBus.execute<unknown, Popup>(new CreatePopupCommand(body));
  }

  @ApiOperation({
    description: '팝업을 수정합니다.',
    summary: '관리자(팝업)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '팝업', canUpdate: true }]))
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdatePopupDto): Promise<boolean> {
    return this.commandBus.execute(new UpdatePopupCommand(id, body));
  }

  @ApiOperation({
    description: '팝업을 삭제합니다.',
    summary: '관리자(팝업)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '팝업', canUpdate: true }]))
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.commandBus.execute(new DeletePopupCommand(id));
  }
}
