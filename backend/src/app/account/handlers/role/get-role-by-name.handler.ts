import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../domain/role.entity';
import { RolePolicy } from '../../domain/role-policy.entity';
import { GetRoleByNameQuery } from '../../queries/role/get-role-by-name.query';

@Injectable()
@QueryHandler(GetRoleByNameQuery)
export class GetRoleByNameHandler implements IQueryHandler<GetRoleByNameQuery> {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}

  async execute({ name }: GetRoleByNameQuery): Promise<(Role & { rolePolicy: RolePolicy[] }) | undefined> {
    const role = await this.roleRepository.findOne({
      where: {
        name
      },
      relations: {
        rolePolicy: true,
        group: true
      }
    });
    if (!role) return undefined;
    return role;
  }
}
