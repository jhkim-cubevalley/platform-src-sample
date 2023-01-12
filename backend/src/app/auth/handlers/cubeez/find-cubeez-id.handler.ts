import { BadRequestException, CACHE_MANAGER, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Cache } from 'cache-manager';
import { Error } from '../../../../infrastructure/common/error';
import { FindCubeezIdCommand } from '../../commands/cubeez/find-cubeez-id.command';
import { GetCubeezByPhoneQuery } from '../../../cubeez/queries/get-cubeez-by-phone.query';

@Injectable()
@CommandHandler(FindCubeezIdCommand)
export class FindCubeezIdHandler implements ICommandHandler<FindCubeezIdCommand> {
  constructor(private readonly queryBus: QueryBus, @Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async execute(command: FindCubeezIdCommand): Promise<string> {
    const { phone, phoneCode } = command.data;
    const phoneCodeData = await this.cacheManager.get(phone);

    if (!phoneCodeData || phoneCodeData !== phoneCode) {
      throw new BadRequestException(Error.NOT_MATCH_PHONE_CODE);
    }

    const cubeez = await this.queryBus.execute(new GetCubeezByPhoneQuery(phone));
    await this.cacheManager.del(phone);

    if (!cubeez) throw new NotFoundException(Error.NOT_FOUND_CUBEEZ);

    Logger.log({ message: `큐비즈의 아이디를 찾았습니다.`, who: cubeez.email });

    return cubeez.email;
  }
}
