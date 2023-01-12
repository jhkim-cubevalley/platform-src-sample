import { BadRequestException, CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { RegisterUserCommand } from '../../commands/user/register-user.command';
import { CreateUserCommand } from '../../../user/commands/create-user.command';
import { Error } from '../../../../infrastructure/common/error';
import { SendEmailCommand } from '../../../email/send-email.command';
import UserRegisterTemplate from '../../../email/templates/user-register.template';
import { GetAllPointConfigQuery } from '../../../point/queries/get-all-point-config.query';
import { GivePointCommand } from '../../../point/commands/give-point.command';

@Injectable()
@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly config: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  private async checkCode(email, phone, emailCode, phoneCode) {
    const emailCodeData = await this.cacheManager.get(email);
    const phoneCodeData = await this.cacheManager.get(phone);

    if (!emailCodeData || emailCodeData !== emailCode) {
      throw new BadRequestException(Error.NOT_MATCH_EMAIL_CODE);
    }
    if (!phoneCodeData || phoneCodeData !== phoneCode) {
      throw new BadRequestException(Error.NOT_MATCH_PHONE_CODE);
    }
  }

  async execute(command: RegisterUserCommand) {
    const { email, password, name, nickname, phone, sex, referralCode, sns, emailCode, phoneCode } = command;
    const option = this.config.get<string>('DISABLE_VERIFY_IDENTITY');

    if (option === 'false') {
      await this.checkCode(email, phone, emailCode, phoneCode);
    }

    const result = await this.commandBus.execute(
      new CreateUserCommand(email, password, name, nickname, sex, phone, referralCode, sns)
    );
    await this.cacheManager.del(email);
    await this.cacheManager.del(phone);

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

    if (option === 'false') {
      await this.commandBus.execute(
        new SendEmailCommand({
          to: [email],
          subject: UserRegisterTemplate(name).subject,
          body: UserRegisterTemplate(name).body
        })
      );
    }
    Logger.log({ message: `새로운 고객이 일반 회원가입을 하였습니다.`, who: email });

    return result;
  }
}
