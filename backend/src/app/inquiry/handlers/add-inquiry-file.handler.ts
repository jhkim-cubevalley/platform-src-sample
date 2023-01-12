import { Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { nanoid } from 'nanoid';
import { extname } from 'path';
import { AddInquiryFileCommand } from '../commands/add-inquiry-file.command';
import { InquiryFile } from '../domain/inquiry-file.entity';

@Injectable()
@CommandHandler(AddInquiryFileCommand)
export class AddInquiryFileHandler implements ICommandHandler<AddInquiryFileCommand> {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(InquiryFile) private readonly repository: Repository<InquiryFile>,
    @InjectAwsService(S3) private readonly s3: S3
  ) {}

  async execute({ data }: AddInquiryFileCommand): Promise<InquiryFile> {
    const { id, file } = data;

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
      inquiry: { id },
      url: fullUrl
    });
    await this.repository.save(result);

    Logger.log({ message: `큐비즈 상담 첨부파일을 업로드했습니다.`, id: result.id, eventId: result.inquiry.id });
    return result;
  }
}
