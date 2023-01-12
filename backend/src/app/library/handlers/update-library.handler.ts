import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Error } from '../../../infrastructure/common/error';
import { UpdateLibraryCommand } from '../commands/update-library.command';
import { Library } from '../domain/library.entity';
import { LibraryDetail } from '../domain/library-detail.entity';
import { GetLibraryQuery } from '../queries/get-library.query';

@Injectable()
@CommandHandler(UpdateLibraryCommand)
export class UpdateLibraryHandler implements ICommandHandler<UpdateLibraryCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectRepository(LibraryDetail) private readonly libraryDetailRepository: Repository<LibraryDetail>,
    private readonly connection: Connection
  ) {}

  async execute({ id, data, detail, account }: UpdateLibraryCommand): Promise<boolean> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const library = await this.queryBus.execute<unknown, Library>(new GetLibraryQuery(id));
      if (!library) throw new NotFoundException(Error.NOT_FOUND_LIBRARY);

      if (library.productPlanDetail?.length > 0) throw new BadRequestException(Error.CAN_NOT_UPDATE_LIBRARY);

      if (account.type === 'CUBEEZ') {
        if (!library.cubeez) throw new ForbiddenException(Error.PERMISSION_DENIED);
        if (library.cubeez.email !== account.email) {
          throw new ForbiddenException(Error.PERMISSION_DENIED);
        }
      }
      if (account.type === 'ADMIN') {
        if (!library.admin) throw new ForbiddenException(Error.PERMISSION_DENIED);
        if (library.admin.email !== account.email) {
          throw new ForbiddenException(Error.PERMISSION_DENIED);
        }
      }

      const { continent, country, city } = data;
      await queryRunner.manager.update(
        Library,
        { id },
        {
          ...data,
          continent: { id: continent.id },
          country: { id: country.id },
          city: { id: city.id }
        }
      );
      await Promise.all(
        Object.entries(detail).map(async ([key, value]) => {
          const { affected } = await queryRunner.manager.update(LibraryDetail, { library: { id }, key }, { value });
          if (affected <= 0) {
            const newDetail = this.libraryDetailRepository.create({
              library: { id },
              key,
              value
            });
            await queryRunner.manager.save(newDetail);
          }
        })
      );
      Logger.log({ message: `라이브러리를 수정했습니다.`, id: library.id });
      await queryRunner.commitTransaction();
      return true;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
