import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { extname } from 'path';
import { ConfigService } from '@nestjs/config';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { Error } from '../../../infrastructure/common/error';
import { AddReviewFileCommand } from '../commands/add-review-file.command';
import { ReviewFile } from '../domain/review-file.entity';

@Injectable()
@CommandHandler(AddReviewFileCommand)
export class AddReviewFileHandler implements ICommandHandler<AddReviewFileCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly config: ConfigService,
    @InjectAwsService(S3) private readonly s3: S3,
    @InjectRepository(ReviewFile) private readonly repository: Repository<ReviewFile>
  ) {}

  async execute({ data }: AddReviewFileCommand): Promise<ReviewFile> {
    const { review, file } = data;

    if (review.files && review.files.length >= 5) {
      throw new ConflictException(Error.CAN_NOT_UPLOAD_IMAGE);
    }

    const url = nanoid() + extname(file.originalname);
    const fullUrl = this.config.get('AWS_IMAGE_CLOUDFRONT') + url;
    await this.s3
      .putObject({
        Bucket: this.config.get('AWS_IMAGE_BUCKET'),
        Body: file.buffer,
        Key: url
      })
      .promise();

    const result = await this.repository.create({
      review: { id: review.id },
      url: fullUrl
    });
    await this.repository.save(result);
    Logger.log({ message: `후기에 첨부파일을 업로드했습니다.`, reviewId: result.id });
    return result;
  }
}
