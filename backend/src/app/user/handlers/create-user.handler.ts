import { ConflictException, Injectable } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import { CreateUserCommand } from '../commands/create-user.command';
import { User } from '../domain/user.entity';
import { GetUserByNicknameQuery } from '../queries/get-user-by-nickname.query';
import { Error } from '../../../infrastructure/common/error';
import { AddSnsCommand } from '../../account/commands/add-sns.command';
import { GetUserByEmailQuery } from '../queries/get-user-by-email.query';
import { GetUserByPhoneQuery } from '../queries/get-user-by-phone.query';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly connection: Connection,
    private readonly config: ConfigService
  ) {}

  async execute(command: CreateUserCommand) {
    const { email, password, name, nickname, phone, sex, referralCode, sns, socialType } = command;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.queryBus.execute(new GetUserByEmailQuery(email));
      if (user !== undefined) throw new ConflictException(Error.USER_ALREADY_EXISTS);
      const userByNickname = await this.queryBus.execute(new GetUserByNicknameQuery(nickname));
      if (userByNickname !== undefined) throw new ConflictException(Error.NICKNAME_ALREADY_EXISTS);
      const userByPhone = await this.queryBus.execute(new GetUserByPhoneQuery(phone));
      if (userByPhone !== undefined) throw new ConflictException(Error.PHONE_ALREADY_EXISTS);

      // TODO: 추천인코드 관련 로직 추가

      let hashedPassword;
      if (socialType === undefined) {
        const hashRound = parseInt(this.config.get('PASSWORD_SALT_ROUND', '12'), 10);
        hashedPassword = await hash(password, hashRound);
      }

      const newUser = await this.userRepository.create({
        email,
        password: socialType ? null : hashedPassword,
        name,
        nickname,
        phone,
        sex,
        socialType: socialType || null
      });
      const result = await queryRunner.manager.save(newUser);

      await Promise.all(
        sns.map(async (each) => {
          const newSns = await this.commandBus.execute(new AddSnsCommand(result, null, each.name, each.handle));
          await queryRunner.manager.save(newSns);
        })
      );
      await queryRunner.commitTransaction();

      delete result.password;
      return result;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
