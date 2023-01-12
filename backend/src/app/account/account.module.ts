import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { AddSnsHandler } from './handlers/add-sns.handler';
import { AccountSns } from './domain/account-sns.entity';
import { Group } from './domain/group.entity';
import { GetSnsHandler } from './handlers/get-sns.handler';
import { Role } from './domain/role.entity';
import { RolePolicy } from './domain/role-policy.entity';
import { GetRoleHandler } from './handlers/role/get-role.handler';
import { GetAllRoleHandler } from './handlers/role/get-all-role.handler';
import { AddRoleHandler } from './handlers/role/add-role.handler';
import { UpdateRoleHandler } from './handlers/role/update-role.handler';
import { DeleteRoleHandler } from './handlers/role/delete-role.handler';
import { UpdateGroupHandler } from './handlers/group/update-group.handler';
import { GetGroupHandler } from './handlers/group/get-group.handler';
import { GetRoleByNameHandler } from './handlers/role/get-role-by-name.handler';
import { CreateGroupHandler } from './handlers/group/create-group.handler';
import { DeleteGroupHandler } from './handlers/group/delete-group.handler';
import { GetAllGroupHandler } from './handlers/group/get-all-group.handler';
import { GetGroupByNameHandler } from './handlers/group/get-group-by-name.handler';
import { GroupController } from './controllers/group.controller';
import { SetGroupToAccountHandler } from './handlers/group/set-group-to-account.handler';
import { SetSnsHandler } from './handlers/set-sns.handler';

const groupCommandHandlers = [CreateGroupHandler, UpdateGroupHandler, DeleteGroupHandler, SetGroupToAccountHandler];
const groupQueryHandlers = [GetAllGroupHandler, GetGroupHandler, GetGroupByNameHandler];
const commandHandlers = [
  AddSnsHandler,
  GetSnsHandler,
  AddRoleHandler,
  UpdateRoleHandler,
  DeleteRoleHandler,
  SetSnsHandler
];
const queryHandlers = [GetRoleHandler, GetAllRoleHandler, GetRoleByNameHandler];

@Module({
  imports: [TypeOrmModule.forFeature([AccountSns, Group, Role, RolePolicy]), CqrsModule],
  providers: [...commandHandlers, ...queryHandlers, ...groupCommandHandlers, ...groupQueryHandlers],
  controllers: [GroupController]
})
export class AccountModule {}
