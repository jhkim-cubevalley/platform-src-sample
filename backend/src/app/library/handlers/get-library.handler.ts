import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Library } from '../domain/library.entity';
import { GetLibraryQuery } from '../queries/get-library.query';

@Injectable()
@QueryHandler(GetLibraryQuery)
export class GetLibraryHandler implements IQueryHandler<GetLibraryQuery> {
  constructor(@InjectRepository(Library) private readonly libraryRepository: Repository<Library>) {}

  async execute({ id }: GetLibraryQuery): Promise<Library> {
    const result = await this.libraryRepository.findOne({
      where: { id },
      relations: {
        detail: true,
        image: true,
        cubeez: true,
        admin: true,
        productPlanDetail: true,
        continent: true,
        country: true,
        city: true
      }
    });
    if (!result) return undefined;
    return result;
  }
}
