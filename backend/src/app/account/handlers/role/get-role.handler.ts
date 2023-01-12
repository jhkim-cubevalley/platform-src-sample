import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../domain/role.entity';
import { GetRoleQuery } from '../../queries/role/get-role.query';
import { RolePolicy } from '../../domain/role-policy.entity';

@Injectable()
@QueryHandler(GetRoleQuery)
export class GetRoleHandler implements IQueryHandler<GetRoleQuery> {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}

  async execute({ id }: GetRoleQuery): Promise<(Role & { rolePolicy: RolePolicy[] }) | undefined> {
    const role = await this.roleRepository.findOne({
      where: {
        id
      },
      relations: {
        rolePolicy: true,
        group: {
          admin: true
        }
      }
    });
    if (!role) return undefined;
    return role;
  }
}
