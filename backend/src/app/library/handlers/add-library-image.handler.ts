import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { extname } from 'path';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { AddLibraryImageCommand } from '../commands/add-library-image.command';
import { LibraryImage } from '../domain/library-image.entity';
import { Error } from '../../../infrastructure/common/error';
import { GetLibraryQuery } from '../queries/get-library.query';
import { Library } from '../domain/library.entity';

@Injectable()
@CommandHandler(AddLibraryImageCommand)
export class AddLibraryImageHandler implements ICommandHandler<AddLibraryImageCommand> {
  constructor(
    private readonly config: ConfigService,
    private readonly queryBus: QueryBus,
    @InjectRepository(LibraryImage) private readonly libraryImageRepository: Repository<LibraryImage>,
    @InjectAwsService(S3) private readonly s3: S3
  ) {}

  async execute({ file, library, transaction }: AddLibraryImageCommand): Promise<Library> {
    if (library && library.image && library.image.length >= 5) {
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

    const image = this.libraryImageRepository.create({
      library,
      imageUrl: fullUrl
    });
    if (transaction) {
      await transaction.save(image);
    } else {
      await this.libraryImageRepository.save(image);
    }
    Logger.log({ message: `라이브러리 이미지를 추가했습니다.`, id: library.id });
    const result = await this.queryBus.execute(new GetLibraryQuery(library.id));
    return result;
  }
}
