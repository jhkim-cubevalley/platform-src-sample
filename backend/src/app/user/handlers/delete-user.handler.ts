import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DeleteUserCommand } from '../commands/delete-user.command';
import { User } from '../domain/user.entity';
import { Error } from '../../../infrastructure/common/error';
import { GetUserQuery } from '../queries/get-user.query';
import { AccountSns } from '../../account/domain/account-sns.entity';
import { Cubeez } from '../../cubeez/domain/cubeez.entity';

@Injectable()
@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly queryBus: QueryBus, private readonly connection: Connection) {}

  async execute({ uid }: DeleteUserCommand): Promise<boolean> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.queryBus.execute<unknown, User>(new GetUserQuery(uid));
      if (!user) throw new NotFoundException(Error.NOT_FOUND_USER);

      await queryRunner.manager.delete(AccountSns, { user: { uid } });
      await queryRunner.manager.softDelete(User, { uid });
      await queryRunner.manager.update(Cubeez, { uid }, { name: '탈퇴한 고객' });
      await queryRunner.commitTransaction();

      return true;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
