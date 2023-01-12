import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Connection } from 'typeorm';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { DeleteLibraryCommand } from '../commands/delete-library.command';
import { Library } from '../domain/library.entity';
import { LibraryImage } from '../domain/library-image.entity';
import { LibraryDetail } from '../domain/library-detail.entity';
import { GetLibraryQuery } from '../queries/get-library.query';
import { Error } from '../../../infrastructure/common/error';

@Injectable()
@CommandHandler(DeleteLibraryCommand)
export class DeleteLibraryHandler implements ICommandHandler<DeleteLibraryCommand> {
  constructor(
    private readonly config: ConfigService,
    private readonly queryBus: QueryBus,
    @InjectAwsService(S3) private readonly s3: S3,
    private readonly connection: Connection
  ) {}

  async execute({ id, account }: DeleteLibraryCommand): Promise<boolean> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const library = await this.queryBus.execute<unknown, Library | undefined>(new GetLibraryQuery(id));
      if (!library) throw new NotFoundException(Error.NOT_FOUND_LIBRARY);
      if (
        (library.cubeez && (account.type !== 'CUBEEZ' || library.cubeez.email !== account.email)) ||
        (library.admin && (account.type !== 'ADMIN' || library.admin.email !== account.email))
      ) {
        throw new ForbiddenException(Error.CAN_DELETE_LIBRARY_ONLY_ME);
      }

      await Promise.all(
        library.image.map(async ({ imageUrl }) => {
          await this.s3
            .deleteObject({
              Bucket: this.config.get('AWS_IMAGE_BUCKET'),
              Key: imageUrl.split('/').pop()
            })
            .promise();
        })
      );
      await queryRunner.manager.delete(LibraryImage, { library: { id } });
      await queryRunner.manager.delete(LibraryDetail, { library: { id } });
      await queryRunner.manager.delete(Library, { id });
      await queryRunner.commitTransaction();

      Logger.log({ message: '라이브러리를 삭제했습니다.', id });
      return true;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
