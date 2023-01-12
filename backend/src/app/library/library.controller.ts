import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  BadRequestException,
  Body,
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
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { TokenGuard } from '../../infrastructure/guards/token.guard';
import Pagination from '../../infrastructure/common/types/pagination-type';
import { Library } from './domain/library.entity';
import { GetAllLibraryQuery } from './queries/get-all-library.query';
import { GetAllLibraryDto } from './domain/get-all-library.dto';
import { Error } from '../../infrastructure/common/error';
import { CreateLibraryCommand } from './commands/create-library.command';
import { CreateLibraryDto } from './domain/create-library.dto';
import { GetCubeezByEmailQuery } from '../cubeez/queries/get-cubeez-by-email.query';
import { GetAdminByEmailQuery } from '../admin/queries/get-admin-by-email.query';
import { GetLibraryQuery } from './queries/get-library.query';
import { AddLibraryImageCommand } from './commands/add-library-image.command';
import { UpdateLibraryCommand } from './commands/update-library.command';
import { DeleteLibraryCommand } from './commands/delete-library.command';
import { UpdateLibraryDto } from './domain/update-library.dto';
import { AddLibraryImageDto } from './domain/add-library-image.dto';
import { GetRegionQuery } from '../product/queries/region/get-region.query';
import { DeleteLibraryImageCommand } from './commands/delete-library-image.command';

const whitelist = ['image/png', 'image/jpeg', 'image/jpg'];
const fileUploadOption: MulterOptions = {
  limits: {
    fileSize: 10485760
  },
  fileFilter: (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      return cb(new BadRequestException(Error.NOT_ALLOW_FILE_ONLY_IMAGE), false);
    }
    return cb(null, true);
  }
};

@ApiTags('library - 라이브러리')
@Controller('library')
export class LibraryController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @ApiOperation({
    description:
      '라이브러리를 가져옵니다. 큐비즈는 자기가 등록한 라이브러리 또는 공개된 라이브러리만 가져올 수 있습니다.'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['CUBEEZ', 'ADMIN']))
  @Get('/:id')
  async get(@Req() req, @Param('id') id: string): Promise<Library & { isEditable: boolean }> {
    const result = await this.queryBus.execute<unknown, Library>(new GetLibraryQuery(id));
    let isEditable = false;
    if (!result) throw new NotFoundException(Error.NOT_FOUND_LIBRARY);
    if (req.decode.type === 'CUBEEZ' && result.isPrivate) {
      if (!result.cubeez) throw new ForbiddenException(Error.PERMISSION_DENIED);
      if (result.cubeez.email !== req.decode.email) {
        throw new ForbiddenException(Error.PERMISSION_DENIED);
      }
    }
    if (req.decode.type === 'CUBEEZ' && result.cubeez && req.decode.email === result.cubeez.email) {
      isEditable = true;
    }
    if (req.decode.type === 'ADMIN') isEditable = true;
    return {
      ...result,
      isEditable
    };
  }

  @ApiOperation({
    description: '모든 라이브러리를 가져옵니다. status 옵션이 없다면 내가 만든 카드를 가져옵니다.'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['CUBEEZ', 'ADMIN']))
  @Get('/')
  async getAll(@Req() req, @Query() query: GetAllLibraryDto): Promise<Pagination<Library>> {
    return this.queryBus.execute<unknown, Pagination<Library>>(
      new GetAllLibraryQuery(
        {
          offset: query.offset,
          limit: query.limit,
          filters: {
            status: query.status ?? 'all',
            name: query.name,
            createdFrom: query.createdFrom ? new Date(query.createdFrom) : undefined,
            createdTo: query.createdTo ? new Date(query.createdTo) : undefined,
            continent: query.continent,
            country: query.country,
            city: query.city,
            cubeezName: query.cubeezName
          }
        },
        { email: req.decode.email, type: req.decode.type }
      )
    );
  }

  /*
    form-data로 받을 시 Boolean, Object 타입 체킹이 안되기 때문에
    String으로 전달받고 이후 후처리를 진행함.
   */
  @ApiOperation({
    description: `
    새로운 라이브러리를 추가합니다.\n
    이미지 첨부는 별도 API를 이용해 추가합니다.
    `
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['CUBEEZ', 'ADMIN']))
  @Post('/')
  async create(@Req() req, @Body() body: CreateLibraryDto): Promise<Library> {
    let author;
    if (req.decode.type === 'CUBEEZ') {
      author = await this.queryBus.execute(new GetCubeezByEmailQuery(req.decode.email));
    }
    if (req.decode.type === 'ADMIN') {
      author = await this.queryBus.execute(new GetAdminByEmailQuery(req.decode.email));
    }
    return this.commandBus.execute(
      new CreateLibraryCommand({
        ...body,
        isPrivate: req.decode.type === 'CUBEEZ' ? true : body.isPrivate,
        author
      })
    );
  }

  @ApiOperation({ description: '새로운 라이브러리 이미지를 추가합니다. (내 라이브러리만 이미지 추가가 가능합니다.)' })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['CUBEEZ', 'ADMIN']))
  @Post('/image/:id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }], fileUploadOption))
  async addImage(
    @Req() req,
    @UploadedFiles() files,
    @Param('id') id: string,
    // Swagger로 파일을 받기 위한 코드
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() _: AddLibraryImageDto
  ): Promise<Library> {
    const library = await this.queryBus.execute(new GetLibraryQuery(id));
    if (!library) throw new NotFoundException(Error.NOT_FOUND_LIBRARY);
    if (req.decode.type === 'CUBEEZ') {
      if (!library.cubeez) throw new ForbiddenException(Error.PERMISSION_DENIED);
      if (library.cubeez.email !== req.decode.email) {
        throw new ForbiddenException(Error.PERMISSION_DENIED);
      }
    }
    if (req.decode.type === 'ADMIN') {
      if (!library.admin) throw new ForbiddenException(Error.PERMISSION_DENIED);
      if (library.admin.email !== req.decode.email) {
        throw new ForbiddenException(Error.PERMISSION_DENIED);
      }
    }
    return this.commandBus.execute(new AddLibraryImageCommand(files.image[0], library));
  }

  @ApiOperation({
    description: `
    라이브러리를 수정합니다. 이미지 추가는 \`/library/image/:id\` API를 사용합니다.
    내 라이브러리만 수정할 수 있습니다.
    detail로 기타 정보 전달 시 존재하지 않는 key 이면 새로 추가합니다.
    `
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['CUBEEZ', 'ADMIN']))
  @Put('/:id')
  async update(@Req() req, @Param('id') id: string, @Body() body: UpdateLibraryDto): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { detail, continent: continentId, country: countryId, city: cityId, ...input } = body;
    const continent = await this.queryBus.execute(new GetRegionQuery(continentId));
    const country = await this.queryBus.execute(new GetRegionQuery(countryId));
    const city = await this.queryBus.execute(new GetRegionQuery(cityId));

    if (!continent || !country || !city) throw new NotFoundException(Error.NOT_FOUND_REGION);

    return this.commandBus.execute(
      new UpdateLibraryCommand(
        id,
        {
          ...input,
          continent,
          country,
          city
        },
        detail,
        { email: req.decode.email, type: req.decode.type }
      )
    );
  }

  @ApiOperation({
    description: `라이브러리를 삭제합니다. 만든 사람만 삭제할 수 있습니다.`
  })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['CUBEEZ', 'ADMIN']))
  @Delete('/:id')
  async delete(@Req() req, @Param('id') id: string): Promise<boolean> {
    return this.commandBus.execute(
      new DeleteLibraryCommand(id, {
        email: req.decode.email,
        type: req.decode.type
      })
    );
  }

  @ApiOperation({
    description: `라이브러리 이미지를 삭제합니다. 큐비즈는 내 라이브러리의 이미지만 삭제할 수 있습니다.`
  })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiImplicitQuery({ name: 'id', description: '라이브러리ID', required: true })
  @ApiImplicitQuery({
    name: 'imageKey',
    description: '이미지 파일명 (주소 제외)',
    required: true,
    example: 'abcdefg.png'
  })
  @UseGuards(TokenGuard(['CUBEEZ', 'ADMIN']))
  @Delete('/:id/image/:imageKey')
  async deleteImage(@Req() req, @Param('id') id: string, @Param('imageKey') imageKey: string): Promise<boolean> {
    const library = await this.queryBus.execute(new GetLibraryQuery(id));
    if (!library) throw new NotFoundException(Error.NOT_FOUND_LIBRARY);
    if (req.decode.type === 'CUBEEZ') {
      if (!library.cubeez) throw new ForbiddenException(Error.PERMISSION_DENIED);
      if (library.cubeez.email !== req.decode.email) {
        throw new ForbiddenException(Error.PERMISSION_DENIED);
      }
    }
    return this.commandBus.execute(
      new DeleteLibraryImageCommand({
        library,
        imageKey
      })
    );
  }
}
