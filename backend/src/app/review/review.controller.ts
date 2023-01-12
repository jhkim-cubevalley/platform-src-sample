import { CommandBus, QueryBus } from '@nestjs/cqrs';
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
import { ApiImplicitParam } from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { TokenGuard } from '../../infrastructure/guards/token.guard';
import { Review } from './domain/review.entity';
import { GetAllReviewByEmailQuery } from './queries/get-all-review-by-email.query';
import { RoleGuard } from '../../infrastructure/guards/role.guard';
import { Error } from '../../infrastructure/common/error';
import { GetReviewQuery } from './queries/get-review.query';
import Pagination from '../../infrastructure/common/types/pagination-type';
import { GetAllReviewWithEventQuery } from './queries/get-all-review-with-event.query';
import { GetAllReviewWithEventDto } from './domain/get-all-review-with-event.dto';
import { GetAllReviewByEventQuery } from './queries/get-all-review-by-event.query';
import { GetEventQuery } from '../event/queries/get-event.query';
import { Event } from '../event/domain/event.entity';
import { CreateReviewCommand } from './commands/create-review.command';
import { CreateReviewDto } from './domain/create-review.dto';
import { User } from '../user/domain/user.entity';
import { GetUserByEmailQuery } from '../user/queries/get-user-by-email.query';
import { AddReviewFileDto } from './domain/add-review-file.dto';
import { AddReviewFileCommand } from './commands/add-review-file.command';
import { ReviewFile } from './domain/review-file.entity';
import { UpsertReviewAnswerCommand } from './commands/upsert-review-answer.command';
import { UpsertReviewAnswerDto } from './domain/upsert-review-answer.dto';
import { GetCubeezByEmailQuery } from '../cubeez/queries/get-cubeez-by-email.query';
import { DeleteReviewAnswerCommand } from './commands/delete-review-answer.command';
import { SendRequestAnswerCommand } from './commands/send-request-answer.command';
import { SendRequestAnswerDto } from './domain/send-request-answer.dto';

const whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
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

@ApiTags('review - 후기 관리')
@Controller('review')
export class ReviewController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @ApiOperation({
    description: '자신이 작성한 모든 후기를 가져옵니다.',
    summary: '고객'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['USER']))
  @Get('/me')
  async getMyData(@Req() req): Promise<Review[]> {
    return this.queryBus.execute<unknown, Review[]>(new GetAllReviewByEmailQuery(req.decode.email));
  }

  @ApiOperation({
    description:
      '후기 정보를 가져옵니다. 고객은 자신의 후기 정보만, 큐비즈는 자기가 만든 여행상품의 후기 정보만 가능합니다.',
    summary: '고객, 큐비즈, 관리자(여행상품)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['USER', 'CUBEEZ', 'ADMIN']), RoleGuard([{ roleCode: '여행상품', canAccess: true }]))
  @Get('/:id')
  async get(@Req() req, @Param('id') id: string): Promise<Review> {
    const result = await this.queryBus.execute<unknown, Review>(new GetReviewQuery(id));
    if (!result) throw new NotFoundException(Error.NOT_FOUND_RESERVATION);
    if (req.decode.type === 'USER' && result.user.email !== req.decode.email) {
      throw new ForbiddenException(Error.PERMISSION_DENIED);
    }
    if (
      req.decode.type === 'CUBEEZ' &&
      result.event.product.cubeez &&
      result.event.product.cubeez.email !== req.decode.email
    ) {
      throw new ForbiddenException(Error.PERMISSION_DENIED);
    }
    return result;
  }

  @ApiOperation({
    description: '특정 행사에 작성된 모든 후기를 가져옵니다. 큐비즈는 자신의 행사 후기만 가져올 수 있습니다.',
    summary: '큐비즈, 관리자(여행상품)'
  })
  @ApiImplicitParam({
    name: 'id',
    description: '행사ID'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['CUBEEZ', 'ADMIN']), RoleGuard([{ roleCode: '여행상품', canAccess: true }]))
  @Get('/event/:id')
  async getAllByEvent(@Req() req, @Param('id') id: number): Promise<Review[]> {
    const event = await this.queryBus.execute<unknown, Event>(new GetEventQuery(id));
    if (!event) throw new NotFoundException(Error.NOT_FOUND_EVENT);
    if (req.decode.type === 'CUBEEZ' && !(event.product.cubeez && event.product.cubeez.email === req.decode.email)) {
      throw new ForbiddenException(Error.PERMISSION_DENIED);
    }
    return this.queryBus.execute(new GetAllReviewByEventQuery(id));
  }

  @ApiOperation({
    description:
      '모든 후기 정보를 가져옵니다. 큐비즈는 자신의 여행상품 후기만 가져옵니다. (여행상품, 행사 내용이 함께 전달됩니다.)',
    summary: '큐비즈, 관리자(여행상품)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['CUBEEZ', 'ADMIN']), RoleGuard([{ roleCode: '여행상품', canAccess: true }]))
  @Get('/')
  async getAll(@Req() req, @Query() query: GetAllReviewWithEventDto): Promise<Pagination<Review>> {
    return this.queryBus.execute(
      new GetAllReviewWithEventQuery({
        offset: query.offset,
        limit: query.limit,
        filters: {
          type: query.type,
          search: query.search
        },
        cubeezEmail: req.decode.type === 'CUBEEZ' ? req.decode.email : undefined
      })
    );
  }

  @ApiOperation({
    description: '새로운 후기를 작성합니다. (자신이 예약한 여행상품이 여행 종료됐을 때만 가능합니다.)',
    summary: '고객'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['USER']))
  @Post('/')
  async create(@Req() req, @Body() body: CreateReviewDto): Promise<Review> {
    const user = await this.queryBus.execute<unknown, User>(new GetUserByEmailQuery(req.decode.email));
    if (!user) throw new NotFoundException(Error.NOT_FOUND_USER);
    return this.commandBus.execute(
      new CreateReviewCommand({
        ...body,
        user
      })
    );
  }

  @ApiOperation({
    description: '후기 첨부파일을 업로드합니다. (자신이 작성한 후기에만 업로드가 가능합니다.)',
    summary: '고객'
  })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['USER']))
  @Post('/upload/:id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }], fileUploadOption))
  async upload(
    @Req() req,
    @UploadedFiles() file,
    @Param('id') id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() _: AddReviewFileDto
  ): Promise<ReviewFile> {
    const review = await this.queryBus.execute<unknown, Review>(new GetReviewQuery(id));
    if (review.user.email !== req.decode.email) throw new ForbiddenException(Error.PERMISSION_DENIED);
    return this.commandBus.execute(
      new AddReviewFileCommand({
        review,
        file: file.image[0]
      })
    );
  }

  @ApiOperation({
    description: '후기 답변을 작성하거나 수정합니다. (자신의 여행상품에 대한 후기에만 작성 또는 수정이 가능합니다.)',
    summary: '큐비즈'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['CUBEEZ']))
  @Put('/answer/:id')
  async updateAnswer(@Req() req, @Param('id') id: string, @Body() body: UpsertReviewAnswerDto): Promise<boolean> {
    const cubeez = await this.queryBus.execute(new GetCubeezByEmailQuery(req.decode.email));
    if (!cubeez) throw new NotFoundException(Error.NOT_FOUND_CUBEEZ);
    return this.commandBus.execute(
      new UpsertReviewAnswerCommand({
        reviewId: id,
        cubeezUid: cubeez.uid,
        answer: body.answer
      })
    );
  }

  @ApiOperation({
    description: '답변을 삭제합니다. (자신의 여행상품에 대한 후기의 답변만 삭제가 가능합니다.)',
    summary: '큐비즈'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['CUBEEZ']))
  @Delete('/answer/:id')
  async deleteAnswer(@Req() req, @Param('id') id: string): Promise<boolean> {
    const cubeez = await this.queryBus.execute(new GetCubeezByEmailQuery(req.decode.email));
    if (!cubeez) throw new NotFoundException(Error.NOT_FOUND_CUBEEZ);
    return this.commandBus.execute(
      new DeleteReviewAnswerCommand({
        reviewId: id,
        cubeezUid: cubeez.uid
      })
    );
  }

  @ApiOperation({
    description: '큐비즈에게 답글 작성 요청 알림(이메일, 시스템 메시지)을 보냅니다.',
    summary: '관리자(여행상품)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '여행상품', canUpdate: true }]))
  @Post('/request')
  async requestAnswer(@Body() body: SendRequestAnswerDto): Promise<boolean> {
    return this.commandBus.execute(new SendRequestAnswerCommand({ eventId: body.eventId }));
  }
}
