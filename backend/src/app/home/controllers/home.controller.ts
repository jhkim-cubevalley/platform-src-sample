import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, NotFoundException, Put, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { TokenGuard } from '../../../infrastructure/guards/token.guard';
import { Error } from '../../../infrastructure/common/error';
import { HomeContent, HomeContentType } from '../domain/home-content.entity';
import { GetHomeContentQuery } from '../queries/get-home-content.query';
import { RoleGuard } from '../../../infrastructure/guards/role.guard';
import { SaveHomeContentDto } from '../domain/save-home-content.dto';
import { SaveHomeContentCommand } from '../commands/save-home-content.command';

@ApiTags('home - 홈 화면 관리')
@Controller('home')
export class HomeController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @ApiOperation({ description: '기타 페이지 내용을 가져옵니다.' })
  @ApiImplicitQuery({
    name: 'type',
    enum: ['CUBEEZ', 'INCENTIVE', 'POINT']
  })
  @Get('/content')
  async get(@Query('type') type: HomeContentType): Promise<HomeContent> {
    const result = await this.queryBus.execute<unknown, HomeContent>(new GetHomeContentQuery(type));
    if (!result) throw new NotFoundException(Error.NOT_FOUND_HOME_CONTENT);
    return result;
  }

  @ApiOperation({ description: '기타 페이지 내용을 저장합니다.' })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '홈전시', canUpdate: true }]))
  @Put('/content')
  async save(@Body() body: SaveHomeContentDto): Promise<HomeContent> {
    return this.commandBus.execute<unknown, HomeContent>(
      new SaveHomeContentCommand({
        type: body.type,
        content: body.content
      })
    );
  }
}
