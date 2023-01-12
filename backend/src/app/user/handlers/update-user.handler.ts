import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import { User } from '../domain/user.entity';
import { UpdateUserCommand } from '../commands/update-user.command';
import { GetUserByPhoneQuery } from '../queries/get-user-by-phone.query';
import { GetUserQuery } from '../queries/get-user.query';
import { Error } from '../../../infrastructure/common/error';
import { GetUserByNicknameQuery } from '../queries/get-user-by-nickname.query';

@Injectable()
@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly config: ConfigService,
    private readonly queryBus: QueryBus,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async execute(command: UpdateUserCommand) {
    const { uid, data, transaction } = command;
    const user = await this.queryBus.execute(new GetUserQuery(uid));
    if (!user) throw new NotFoundException(Error.NOT_FOUND_USER);

    if (data.phone) {
      const existsPhone = await this.queryBus.execute(new GetUserByPhoneQuery(data.phone as string));
      if (existsPhone && user.uid !== existsPhone.uid) throw new ConflictException(Error.USER_ALREADY_EXISTS);
    }
    if (data.nickname) {
      const existsNickname = await this.queryBus.execute(new GetUserByNicknameQuery(data.nickname as string));
      if (existsNickname && user.uid !== existsNickname.uid) throw new ConflictException(Error.USER_ALREADY_EXISTS);
    }

    const hashRound = parseInt(this.config.get('PASSWORD_SALT_ROUND', '12'), 10);
    if (transaction) {
      await transaction.update(
        User,
        { uid },
        {
          ...data,
          // eslint-disable-next-line no-nested-ternary
          password: user.socialType ? null : data.password ? await hash(data.password as string, hashRound) : undefined
        }
      );
    } else {
      await this.userRepository.update(
        { uid },
        {
          ...data,
          // eslint-disable-next-line no-nested-ternary
          password: user.socialType ? null : data.password ? await hash(data.password as string, hashRound) : undefined
        }
      );
    }
    Logger.log({ message: `고객 계정 정보를 수정했습니다.`, uid });
    return true;
  }
}
