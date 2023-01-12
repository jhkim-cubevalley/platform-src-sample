import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../domain/role.entity';
import { RolePolicy } from '../../domain/role-policy.entity';
import { GetAllRoleQuery } from '../../queries/role/get-all-role.query';
import Pagination from '../../../../infrastructure/common/types/pagination-type';

@Injectable()
@QueryHandler(GetAllRoleQuery)
export class GetAllRoleHandler implements IQueryHandler<GetAllRoleQuery> {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}

  async execute({
    data: { offset, limit }
  }: GetAllRoleQuery): Promise<Pagination<Role & { rolePolicy: RolePolicy[] }>> {
    let pageOption = {};
    if (offset && limit) {
      pageOption = {
        take: limit,
        skip: limit * (offset - 1)
      };
    }
    const [role, total] = await this.roleRepository.findAndCount({
      ...pageOption,
      order: {
        id: {
          direction: 'asc'
        }
      },
      relations: {
        rolePolicy: true,
        group: true
      }
    });
    return {
      data: role,
      pageTotal: role.length,
      total
    };
  }
}
