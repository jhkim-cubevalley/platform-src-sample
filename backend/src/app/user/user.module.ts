import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { User } from './domain/user.entity';
import { CreateUserHandler } from './handlers/create-user.handler';
import { GetUserHandler } from './handlers/get-user.handler';
import { GetUserByNicknameHandler } from './handlers/get-user-by-nickname.handler';
import { GetUserByEmailHandler } from './handlers/get-user-by-email.handler';
import { GetUserByPhoneHandler } from './handlers/get-user-by-phone.handler';
import { UpdateUserHandler } from './handlers/update-user.handler';
import { GetAllUserHandler } from './handlers/get-all-user.handler';
import { DeleteUserHandler } from './handlers/delete-user.handler';
import { UserController } from './user.controller';

const commandHandlers = [CreateUserHandler, UpdateUserHandler, DeleteUserHandler];
const queryHandlers = [
  GetUserHandler,
  GetUserByNicknameHandler,
  GetUserByEmailHandler,
  GetUserByPhoneHandler,
  GetAllUserHandler
];

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  providers: [...commandHandlers, ...queryHandlers],
  controllers: [UserController]
})
export class UserModule {}
