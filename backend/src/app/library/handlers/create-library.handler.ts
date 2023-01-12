import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { LibraryDetail } from '../domain/library-detail.entity';
import { LibraryImage } from '../domain/library-image.entity';
import { Library } from '../domain/library.entity';
import { CreateLibraryCommand } from '../commands/create-library.command';
import { Admin } from '../../admin/domain/admin.entity';
import { Cubeez } from '../../cubeez/domain/cubeez.entity';
import { GetRegionQuery } from '../../product/queries/region/get-region.query';
import { Error } from '../../../infrastructure/common/error';

@Injectable()
@CommandHandler(CreateLibraryCommand)
export class CreateLibraryHandler implements ICommandHandler<CreateLibraryCommand> {
  constructor(
    private readonly config: ConfigService,
    private readonly queryBus: QueryBus,
    @InjectRepository(Library) private readonly libraryRepository: Repository<Library>,
    @InjectRepository(LibraryImage) private readonly libraryImageRepository: Repository<LibraryImage>,
    @InjectRepository(LibraryDetail) private readonly libraryDetailRepository: Repository<LibraryDetail>,
    @InjectAwsService(S3) private readonly s3: S3,
    private readonly connection: Connection
  ) {}

  async execute({ data }: CreateLibraryCommand): Promise<Library> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    if (!(await this.queryBus.execute(new GetRegionQuery(data.continent)))) {
      throw new NotFoundException(Error.NOT_FOUND_REGION);
    }
    if (!(await this.queryBus.execute(new GetRegionQuery(data.country)))) {
      throw new NotFoundException(Error.NOT_FOUND_REGION);
    }
    if (!(await this.queryBus.execute(new GetRegionQuery(data.city)))) {
      throw new NotFoundException(Error.NOT_FOUND_REGION);
    }

    try {
      const { detail, author, continent, country, city, ...input } = data;
      const library = this.libraryRepository.create({
        ...input,
        continent: { id: continent },
        country: { id: country },
        city: { id: city },
        cubeez: author instanceof Cubeez ? author : null,
        admin: author instanceof Admin ? author : null
      });
      await queryRunner.manager.save(library);

      await Promise.all(
        Object.entries(detail).map(async ([key, value]) => {
          const newDetail = this.libraryDetailRepository.create({
            library,
            key,
            value
          });
          await queryRunner.manager.save(newDetail);
        })
      );

      await queryRunner.commitTransaction();

      Logger.log({ message: '새로운 라이브러리를 추가했습니다.', id: library.id });

      return library;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
