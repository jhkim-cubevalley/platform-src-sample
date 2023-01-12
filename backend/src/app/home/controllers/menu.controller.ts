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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TokenGuard } from '../../../infrastructure/guards/token.guard';
import { Error } from '../../../infrastructure/common/error';
import Pagination from '../../../infrastructure/common/types/pagination-type';
import { RoleGuard } from '../../../infrastructure/guards/role.guard';
import { Menu } from '../domain/menu/menu.entity';
import { GetMenuQuery } from '../queries/menu/get-menu.query';
import { GetAllMenuDto } from '../domain/menu/get-all-menu.dto';
import { GetAllMenuQuery } from '../queries/menu/get-all-menu.query';
import { CreateMenuDto } from '../domain/menu/create-menu.dto';
import { CreateMenuCommand } from '../commands/menu/create-menu.command';
import { UpdateMenuDto } from '../domain/menu/update-menu.dto';
import { UpdateMenuCommand } from '../commands/menu/update-menu.command';
import { DeleteMenuCommand } from '../commands/menu/delete-menu.command';

@ApiTags('menu - 메뉴(카테고리) 관리')
@Controller('menu')
export class MenuController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @ApiOperation({ description: '메뉴 카테고리를 가져옵니다.' })
  @Get('/:id')
  async get(@Req() req, @Param('id') id: string): Promise<Menu> {
    const result = await this.queryBus.execute<unknown, Menu>(new GetMenuQuery(id));
    if (!result) throw new NotFoundException(Error.NOT_FOUND_MENU);
    return result;
  }

  @ApiOperation({
    description: '모든 메뉴 카테고리를 가져옵니다.'
  })
  @Get('/')
  async getAll(@Req() req, @Query() query: GetAllMenuDto): Promise<Pagination<Menu>> {
    return this.queryBus.execute<unknown, Pagination<Menu>>(
      new GetAllMenuQuery({
        offset: query.offset,
        limit: query.limit,
        filters: {
          sort: query.sort
        }
      })
    );
  }

  @ApiOperation({
    description: '새로운 메뉴 카테고리를 만듭니다.'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '홈전시', canUpdate: true }]))
  @Post('/')
  async create(@Body() body: CreateMenuDto): Promise<Menu> {
    return this.commandBus.execute<unknown, Menu>(
      new CreateMenuCommand({
        ...body
      })
    );
  }

  @ApiOperation({
    description: '메뉴 카테고리를 수정합니다.'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '홈전시', canUpdate: true }]))
  @Put('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateMenuDto): Promise<boolean> {
    return this.commandBus.execute(
      new UpdateMenuCommand(id, {
        ...body
      })
    );
  }

  @ApiOperation({
    description: '메뉴 카테고리를 삭제합니다.'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '홈전시', canUpdate: true }]))
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.commandBus.execute(new DeleteMenuCommand(id));
  }
}
