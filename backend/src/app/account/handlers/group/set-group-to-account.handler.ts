import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { SetGroupToAccountCommand } from '../../commands/group/set-group-to-account.command';
import { UpdateUserCommand } from '../../../user/commands/update-user.command';
import { GetGroupQuery } from '../../queries/group/get-group.query';
import { Error } from '../../../../infrastructure/common/error';
import { UpdateCubeezCommand } from '../../../cubeez/commands/update-cubeez.command';
import { UpdateAdminCommand } from '../../../admin/commands/update-admin.command';

@Injectable()
@CommandHandler(SetGroupToAccountCommand)
export class SetGroupToAccountHandler implements ICommandHandler<SetGroupToAccountCommand> {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  async execute({ data }: SetGroupToAccountCommand): Promise<boolean> {
    const { uid, type, groupId } = data;

    const group = await this.queryBus.execute(new GetGroupQuery(groupId));
    if (group === undefined) throw new NotFoundException(Error.NOT_FOUND_GROUP);

    switch (type) {
      case 'USER':
        await this.commandBus.execute(new UpdateUserCommand(uid, { group: groupId === null ? null : group }));
        break;
      case 'CUBEEZ':
        await this.commandBus.execute(new UpdateCubeezCommand(uid, { group: groupId === null ? null : group }));
        break;
      case 'ADMIN':
        await this.commandBus.execute(new UpdateAdminCommand(uid, { groupId }));
        break;
      default:
        break;
    }

    Logger.log({ message: `그룹을 계정에 배정하였습니다.`, uid, name: group.name, type });

    return true;
  }
}
