import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { AddRoleCommand } from '../../commands/role/add-role.command';
import { Role } from '../../domain/role.entity';
import { RolePolicy } from '../../domain/role-policy.entity';
import { GetRoleQuery } from '../../queries/role/get-role.query';
import { GetGroupQuery } from '../../queries/group/get-group.query';
import { Error } from '../../../../infrastructure/common/error';
import { GetRoleByNameQuery } from '../../queries/role/get-role-by-name.query';

@Injectable()
@CommandHandler(AddRoleCommand)
export class AddRoleHandler implements ICommandHandler<AddRoleCommand> {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(RolePolicy) private readonly rolePolicyRepository: Repository<RolePolicy>,
    private readonly connection: Connection,
    private readonly queryBus: QueryBus
  ) {}

  async execute({ data: { name, groupId, policies } }: AddRoleCommand): Promise<Role> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (groupId) {
        const group = await this.queryBus.execute(new GetGroupQuery(groupId));
        if (!group) throw new NotFoundException(Error.NOT_FOUND_GROUP);
      }
      const roleName = await this.queryBus.execute(new GetRoleByNameQuery(name));
      if (roleName) throw new NotFoundException(Error.ROLE_ALREADY_EXISTS);

      const newRole = this.roleRepository.create({
        name,
        group: groupId
          ? {
              id: groupId
            }
          : undefined
      });
      const role = await queryRunner.manager.save(newRole);
      await Promise.all(
        policies.map(async (each) => {
          const newPolicy = await this.rolePolicyRepository.create({
            ...each,
            role
          });
          await queryRunner.manager.save(newPolicy);
        })
      );
      await queryRunner.commitTransaction();
      Logger.log({ message: `새로운 규칙과 정책을 추가했습니다.`, id: newRole.id });
      return this.queryBus.execute(new GetRoleQuery(newRole.id));
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
