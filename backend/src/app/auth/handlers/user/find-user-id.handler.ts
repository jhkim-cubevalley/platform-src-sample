import { BadRequestException, CACHE_MANAGER, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Cache } from 'cache-manager';
import { FindUserIdCommand } from '../../commands/user/find-user-id.command';
import { Error } from '../../../../infrastructure/common/error';
import { GetUserByPhoneQuery } from '../../../user/queries/get-user-by-phone.query';

@Injectable()
@CommandHandler(FindUserIdCommand)
export class FindUserIdHandler implements ICommandHandler<FindUserIdCommand> {
  constructor(private readonly queryBus: QueryBus, @Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async execute(command: FindUserIdCommand) {
    const { phone, phoneCode } = command;
    const phoneCodeData = await this.cacheManager.get(phone);

    if (!phoneCodeData || phoneCodeData !== phoneCode) {
      throw new BadRequestException(Error.NOT_MATCH_PHONE_CODE);
    }

    const user = await this.queryBus.execute(new GetUserByPhoneQuery(phone));
    await this.cacheManager.del(phone);

    if (!user) throw new NotFoundException(Error.NOT_FOUND_USER);
    if (user.socialType !== null) throw new BadRequestException(Error.NOT_USE_SOCIAL);

    Logger.log({ message: `고객의 아이디를 찾았습니다.`, who: user.email });

    return user.email;
  }
}
