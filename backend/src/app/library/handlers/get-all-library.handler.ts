import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { GetAllLibraryQuery } from '../queries/get-all-library.query';
import { Library } from '../domain/library.entity';
import GroupType from '../../../infrastructure/common/types/group-type';

@Injectable()
@QueryHandler(GetAllLibraryQuery)
export class GetAllLibraryHandler implements IQueryHandler<GetAllLibraryQuery> {
  constructor(@InjectRepository(Library) private readonly libraryRepository: Repository<Library>) {}

  private getFiltersByStatus(status: 'all' | 'me' | 'admin', type: GroupType) {
    let query;
    if (status === 'me') {
      if (type === 'CUBEEZ') query = 'cubeez.email = :email AND Library.admin IS NULL';
      if (type === 'ADMIN') query = 'Library.cubeez IS NULL AND admin.email = :email';
    }
    if (status === 'admin') query = 'Library.isPrivate = false';
    return query;
  }

  async execute({ data, account }: GetAllLibraryQuery): Promise<any> {
    const { offset, limit } = data;
    let pageOption: { take?: number; skip?: number } = {};
    if (offset && limit) {
      pageOption = {
        take: limit,
        skip: limit * (offset - 1)
      };
    }

    let query = this.libraryRepository
      .createQueryBuilder('Library')
      .leftJoinAndSelect('Library.detail', 'detail')
      .leftJoinAndSelect('Library.image', 'image')
      .leftJoinAndSelect('Library.cubeez', 'cubeez')
      .leftJoinAndSelect('Library.admin', 'admin')
      .leftJoinAndSelect('Library.productPlanDetail', 'productPlanDetail')
      .leftJoinAndSelect('Library.continent', 'continent')
      .leftJoinAndSelect('Library.country', 'country')
      .leftJoinAndSelect('Library.city', 'city')
      .take(pageOption.take)
      .skip(pageOption.skip)
      .where('');

    if (data.filters.createdFrom && data.filters.createdTo) {
      query = query.andWhere('Library.createdAt BETWEEN :createdFrom AND :createdTo', {
        createdFrom: dayjs(data.filters.createdFrom).toDate(),
        createdTo: dayjs(data.filters.createdTo).add(1, 'd').toDate()
      });
    }
    if (data.filters.name) {
      query = query.andWhere('Library.name LIKE :name', { name: `%${data.filters.name}%` });
    }
    if (data.filters.continent) {
      query = query.andWhere('Library.continent.id = :continent', {
        continent: data.filters.continent
      });
    }
    if (data.filters.country) {
      query = query.andWhere('Library.country.id = :country', {
        country: data.filters.country
      });
    }
    if (data.filters.city) {
      query = query.andWhere('Library.city.id = :city', {
        city: data.filters.city
      });
    }
    if (data.filters.cubeezName) {
      query = query.andWhere('cubeez.name LIKE :cubeezName', {
        cubeezName: `%${data.filters.cubeezName}%`
      });
    }
    if (data.filters.status) {
      if (data.filters.status === 'all') {
        if (account.type === 'CUBEEZ') {
          query = query.andWhere('(cubeez.email = :cubeezEmail OR Library.isPrivate = false)', {
            cubeezEmail: account.email
          });
        }
      } else {
        query = query.andWhere(this.getFiltersByStatus(data.filters.status, account.type), {
          email: account.email,
          private: false
        });
      }
    }

    const [result, total] = await query.orderBy('Library.createdAt', 'DESC').getManyAndCount();

    return {
      data: result,
      pageTotal: result.length,
      total
    };
  }
}
