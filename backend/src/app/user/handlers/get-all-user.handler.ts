import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { GetAllUserQuery } from '../queries/get-all-user.query';
import { User } from '../domain/user.entity';
import Pagination from '../../../infrastructure/common/types/pagination-type';

@Injectable()
@QueryHandler(GetAllUserQuery)
export class GetAllUserHandler implements IQueryHandler<GetAllUserQuery> {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async execute({ data }: GetAllUserQuery): Promise<Pagination<User>> {
    const { offset, limit } = data;
    let pageOption = {};
    if (offset && limit) {
      pageOption = {
        take: limit,
        skip: limit * (offset - 1)
      };
    }

    const [result, total] = await this.userRepository.findAndCount({
      ...pageOption,
      select: {
        password: false
      },
      where: {
        name: data.filters.name,
        nickname: data.filters.nickname,
        group: data.filters.groupId
          ? {
              id: data.filters.groupId
            }
          : undefined,
        createdAt: data.filters.createdFrom
          ? Between(dayjs(data.filters.createdFrom).toDate(), dayjs(data.filters.createdTo).add(1, 'd').toDate())
          : undefined
      },
      order: {
        createdAt: 'desc'
      },
      relations: {
        accountSns: true,
        group: {
          role: {
            rolePolicy: true
          }
        },
        reviews: true
      }
    });

    return {
      data: result,
      pageTotal: result.length,
      total
    };
  }
}
