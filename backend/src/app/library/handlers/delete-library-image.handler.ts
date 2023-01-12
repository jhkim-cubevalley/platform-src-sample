import { Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { LibraryImage } from '../domain/library-image.entity';
import { DeleteLibraryImageCommand } from '../commands/delete-library-image.command';

@Injectable()
@CommandHandler(DeleteLibraryImageCommand)
export class DeleteLibraryImageHandler implements ICommandHandler<DeleteLibraryImageCommand> {
  constructor(
    private readonly config: ConfigService,
    private readonly queryBus: QueryBus,
    @InjectRepository(LibraryImage) private readonly libraryImageRepository: Repository<LibraryImage>,
    @InjectAwsService(S3) private readonly s3: S3
  ) {}

  async execute({ data }: DeleteLibraryImageCommand): Promise<boolean> {
    const host = this.config.get('AWS_IMAGE_CLOUDFRONT');

    const isExists = await this.libraryImageRepository.findOne({
      where: {
        library: { id: data.library.id },
        imageUrl: `${host}${data.imageKey}`
      }
    });
    if (!isExists) return false;

    await this.s3.deleteObject({
      Bucket: this.config.get('AWS_IMAGE_BUCKET'),
      Key: data.imageKey
    });

    if (data.transaction) {
      await data.transaction.delete(LibraryImage, {
        library: { id: data.library.id },
        imageUrl: `${host}${data.imageKey}`
      });
    } else {
      await this.libraryImageRepository.delete({
        library: { id: data.library.id },
        imageUrl: `${host}${data.imageKey}`
      });
    }

    Logger.log({ message: `라이브러리 이미지를 삭제했습니다.`, id: data.library.id, key: data.imageKey });
    return true;
  }
}
