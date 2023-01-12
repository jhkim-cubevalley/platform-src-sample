import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Role } from '../../domain/role.entity';
import { DeleteRoleCommand } from '../../commands/role/delete-role.command';
import { Error } from '../../../../infrastructure/common/error';
import { RolePolicy } from '../../domain/role-policy.entity';
import { GetRoleQuery } from '../../queries/role/get-role.query';

@Injectable()
@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler implements ICommandHandler<DeleteRoleCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(RolePolicy) private readonly rolePolicyRepository: Repository<RolePolicy>
  ) {}

  async execute({ id }: DeleteRoleCommand): Promise<boolean> {
    try {
      const role = await this.queryBus.execute(new GetRoleQuery(id));
      if (!role) throw new NotFoundException(Error.NOT_FOUND_ROLE);

      await this.rolePolicyRepository.delete({ role: { id } });
      await this.roleRepository.delete({ id });

      Logger.log({ message: `규칙과 정책을 삭제했습니다.`, id });
      return true;
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new ConflictException(Error.MUST_UNLINK_GROUP_BEFORE);
      }
      throw e;
    }
  }
}
