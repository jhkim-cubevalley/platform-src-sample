import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import Pagination from '../../../infrastructure/common/types/pagination-type';
import { GetAllCubeezQuery } from '../queries/get-all-cubeez.query';
import { Cubeez } from '../domain/cubeez.entity';

@Injectable()
@QueryHandler(GetAllCubeezQuery)
export class GetAllCubeezHandler implements IQueryHandler<GetAllCubeezQuery> {
  constructor(@InjectRepository(Cubeez) private readonly cubeezRepository: Repository<Cubeez>) {}

  async execute({ data }: GetAllCubeezQuery): Promise<Pagination<Cubeez>> {
    const { offset, limit } = data;
    let pageOption: { take?: number; skip?: number } = {};
    if (offset && limit) {
      pageOption = {
        take: limit,
        skip: limit * (offset - 1)
      };
    }

    let query = this.cubeezRepository
      .createQueryBuilder('Cubeez')
      .leftJoinAndSelect('Cubeez.accountSns', 'accountSns')
      .leftJoinAndSelect('Cubeez.cubeezPhone', 'cubeezPhone')
      .leftJoinAndSelect('Cubeez.group', 'group')
      .leftJoinAndSelect('Cubeez.manageGroup', 'manageGroup')
      .leftJoinAndSelect('Cubeez.reviews', 'reviews')
      .take(pageOption.take)
      .skip(pageOption.skip)
      .where('');

    if (data.filters.onlyRequestApprove) {
      query = query.andWhere('Cubeez.isApprove = false AND Cubeez.denyReason IS NULL');
    }
    if (data.filters.name) query = query.andWhere('Cubeez.name LIKE :name', { name: `%${data.filters.name}%` });
    if (data.filters.nickOrBusinessName) {
      query = query.andWhere('Cubeez.nickName LIKE :nickName OR Cubeez.businessName LIKE :businessName', {
        nickName: `%${data.filters.nickOrBusinessName}%`,
        businessName: `%${data.filters.nickOrBusinessName}%`
      });
    }
    if (data.filters.isApprove !== undefined) {
      query = query.andWhere('Cubeez.isApprove = :isApprove', { isApprove: data.filters.isApprove });
    }
    if (data.filters.isBusiness !== undefined) {
      query = query.andWhere('Cubeez.isBusiness = :isBusiness', { isBusiness: data.filters.isBusiness });
    }
    if (data.filters.createdFrom && data.filters.createdTo) {
      query = query.andWhere('Cubeez.createdAt BETWEEN :createdFrom AND :createdTo', {
        createdFrom: dayjs(data.filters.createdFrom).toDate(),
        createdTo: dayjs(data.filters.createdTo).add(1, 'd').toDate()
      });
    }
    if (data.filters.manageGroupId) {
      query = query.andWhere('manageGroup.id = :manageGroupId', { manageGroupId: data.filters.manageGroupId });
    }

    const [result, total] = await query.orderBy('Cubeez.createdAt', 'DESC').getManyAndCount();

    return {
      data: result,
      pageTotal: result.length,
      total
    };
  }
}
