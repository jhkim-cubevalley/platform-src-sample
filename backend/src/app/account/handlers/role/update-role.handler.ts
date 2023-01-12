import { ConflictException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Role } from '../../domain/role.entity';
import { UpdateRoleCommand } from '../../commands/role/update-role.command';
import { Error } from '../../../../infrastructure/common/error';
import { GetRoleQuery } from '../../queries/role/get-role.query';
import { RolePolicy } from '../../domain/role-policy.entity';
import { GetGroupQuery } from '../../queries/group/get-group.query';
import { GetRoleByNameQuery } from '../../queries/role/get-role-by-name.query';
import { DEFAULT_MASTER_ADMIN_EMAIL } from '../../../../infrastructure/constant';
import { Group } from '../../domain/group.entity';

@Injectable()
@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand> {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(RolePolicy) private readonly rolePolicyRepository: Repository<RolePolicy>,
    private readonly queryBus: QueryBus,
    private readonly connection: Connection,
    private readonly config: ConfigService
  ) {}

  async execute({ data: { id, name, groupId, policies } }: UpdateRoleCommand): Promise<Role> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const role = await this.queryBus.execute<unknown, Role | undefined>(new GetRoleQuery(id));
      if (!role) throw new NotFoundException(Error.NOT_FOUND_ROLE);

      const whenChangeGroup = groupId !== undefined;
      if (whenChangeGroup) {
        const group = await this.queryBus.execute<unknown, Group | undefined>(new GetGroupQuery(groupId));
        if (!group) throw new NotFoundException(Error.NOT_FOUND_GROUP);

        const masterAdmin = this.config.get('MASTER_ADMIN_EMAIL', DEFAULT_MASTER_ADMIN_EMAIL);
        if (role.group?.admin?.length > 0 && role.group.admin.map(({ email }) => email).includes(masterAdmin)) {
          throw new ForbiddenException(Error.CAN_NOT_UPDATE_MASTER_GROUP);
        }
      }

      const whenChangeName = name;
      if (whenChangeName) {
        const existsName = await this.queryBus.execute<unknown, Role>(new GetRoleByNameQuery(name));
        if (existsName && existsName.id !== role.id) throw new ConflictException(Error.ROLE_ALREADY_EXISTS);
      }

      let group;
      if (groupId === undefined) group = undefined;
      if (groupId === null) group = null;
      if (groupId) group = { id: groupId };

      const prevRolePolicy = role.rolePolicy;
      await queryRunner.manager.update(Role, { id }, { name, group });
      await queryRunner.manager.delete(RolePolicy, { role: { id } });
      await Promise.all(
        policies.map(async (each) => {
          const created = await this.rolePolicyRepository.create({
            role: { id },
            ...each
          });
          await queryRunner.manager.save(created);
        })
      );
      if (prevRolePolicy.map(({ code }) => code).includes('마스터')) {
        const masterRole = await this.rolePolicyRepository.create({
          role: { id },
          code: '마스터',
          canAccess: true,
          canUpdate: true,
          canApprove: true
        });
        await queryRunner.manager.save(masterRole);
      }
      await queryRunner.commitTransaction();
      Logger.log({ message: `규칙과 정책을 수정했습니다.`, id });
      return this.queryBus.execute(new GetRoleQuery(id));
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
