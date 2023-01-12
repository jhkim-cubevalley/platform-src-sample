import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { TokenGuard } from '../../../infrastructure/guards/token.guard';
import { UploadBoardImageCommand } from './commands/upload-board-image.command';
import { Error } from '../../../infrastructure/common/error';
import { UploadImageDto } from './domain/upload-image.dto';
import { getAccountByEmail } from '../../../infrastructure/common/util';

const whitelist = ['image/png', 'image/jpeg', 'image/jpg'];
const fileUploadOption: MulterOptions = {
  limits: {
    fileSize: 5242880
  },
  fileFilter: (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      return cb(new BadRequestException(Error.NOT_ALLOW_FILE), false);
    }
    return cb(null, true);
  }
};

@ApiTags('board upload - 이미지, 파일 업로드')
@Controller('board')
export class UploadController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @ApiOperation({
    description: '게시글 이미지를 업로드합니다. 이미지 URL을 반환합니다.',
    summary: '고객, 큐비즈, 관리자'
  })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['USER', 'CUBEEZ', 'ADMIN']))
  @Post('/upload')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'upload', maxCount: 1 }], fileUploadOption))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async uploadBoardImage(@Req() req, @UploadedFiles() file, @Body() _: UploadImageDto): Promise<{ url: string }> {
    const account = await getAccountByEmail(this.queryBus, req.decode.email, req.decode.type);
    const url = await this.commandBus.execute(new UploadBoardImageCommand({ file: file.upload[0], uid: account.uid }));
    return { url };
  }
}
