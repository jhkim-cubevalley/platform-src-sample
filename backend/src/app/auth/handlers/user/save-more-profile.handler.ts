import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { BadRequestException, CACHE_MANAGER, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { SaveMoreProfileCommand } from '../../commands/user/save-more-profile.command';
import { Error } from '../../../../infrastructure/common/error';
import { CreateUserCommand } from '../../../user/commands/create-user.command';
import SexType from '../../../../infrastructure/common/types/sex-type';
import SocialType from '../../../../infrastructure/common/types/social-type';
import { SendEmailCommand } from '../../../email/send-email.command';
import UserRegisterTemplate from '../../../email/templates/user-register.template';
import { GetAllPointConfigQuery } from '../../../point/queries/get-all-point-config.query';
import { GivePointCommand } from '../../../point/commands/give-point.command';

@Injectable()
@CommandHandler(SaveMoreProfileCommand)
export class SaveMoreProfileHandler implements ICommandHandler<SaveMoreProfileCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  async execute({ data }: SaveMoreProfileCommand) {
    const { id, nickname, referralCode, sns } = data;
    const tempData = await this.cacheManager.get<{
      email: string;
      name: string;
      phone: string | null;
      sex: SexType;
      socialType: SocialType;
    }>(id);

    if (!tempData) {
      throw new BadRequestException(Error.FAIL_SOCIAL_LOGIN);
    }
    const isFacebookButNotFoundPhone = tempData.phone === null && (data.phone === undefined || data.phone === null);
    const isAppleButNotFoundSex = tempData.sex === null && (data.sex === undefined || data.sex === null);
    if (isFacebookButNotFoundPhone || isAppleButNotFoundSex) {
      throw new NotFoundException(Error.NOT_FOUND_SOICAL_INFO);
    }

    const { email, name, phone, sex, socialType } = tempData;
    const result = await this.commandBus.execute(
      new CreateUserCommand(
        email,
        null,
        name,
        nickname,
        sex ?? data.sex,
        phone ?? data.phone,
        referralCode ?? null,
        sns,
        socialType
      )
    );
    await this.cacheManager.del(id);

    const userPoint = await this.queryBus.execute(new GetAllPointConfigQuery('NEW_USER_POINT'));
    if (userPoint && userPoint[0]) {
      await this.commandBus.execute(
        new GivePointCommand({
          userUid: result.uid,
          value: Number(userPoint[0].value),
          cause: '신규 회원'
        })
      );
    }

    await this.commandBus.execute(
      new SendEmailCommand({
        to: [email],
        subject: UserRegisterTemplate(name).subject,
        body: UserRegisterTemplate(name).body
      })
    );
    Logger.log({ message: `새로운 고객이 소셜 회원가입을 하였습니다.`, who: email });

    return result;
  }
}
