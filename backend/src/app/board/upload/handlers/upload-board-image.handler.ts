import { Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { ContentImage } from '../domain/content-image.entity';
import { UploadBoardImageCommand } from '../commands/upload-board-image.command';

@Injectable()
@CommandHandler(UploadBoardImageCommand)
export class UploadBoardImageHandler implements ICommandHandler<UploadBoardImageCommand> {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(ContentImage) private readonly contentImageRepository: Repository<ContentImage>,
    @InjectAwsService(S3) private readonly s3: S3
  ) {}

  async execute({ data: { file, uid } }: UploadBoardImageCommand): Promise<string> {
    const imageName = uuidv4() + extname(file.originalname);
    const fullUrl = this.config.get('AWS_IMAGE_CLOUDFRONT') + imageName;

    await this.s3
      .putObject({
        Bucket: this.config.get('AWS_IMAGE_BUCKET'),
        Body: file.buffer,
        Key: imageName
      })
      .promise();

    const contentImage = this.contentImageRepository.create({
      imageUrl: imageName,
      uid
    });
    await this.contentImageRepository.save(contentImage);
    Logger.log({ message: `게시판 이미지를 S3에 업로드했습니다.`, url: fullUrl });
    return fullUrl;
  }
}
