import { BadRequestException, CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Cache } from 'cache-manager';
import { Connection } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { RegisterCubeezCommand } from '../../commands/cubeez/register-cubeez.command';
import { CreateCubeezCommand } from '../../../cubeez/commands/create-cubeez.command';
import { Error } from '../../../../infrastructure/common/error';
import { SendNotificationCommand } from '../../../notification/commands/send-notification.command';
import { SendEmailCommand } from '../../../email/send-email.command';
import { GetAdminByRuleQuery } from '../../../admin/queries/get-admin-by-rule.query';
import CubeezRequestTemplate from '../../../email/templates/cubeez-request.template';

@Injectable()
@CommandHandler(RegisterCubeezCommand)
export class RegisterCubeezHandler implements ICommandHandler<RegisterCubeezCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly connection: Connection,
    private readonly config: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  private async checkCode(email, phones, emailCode, phoneCodes) {
    const emailCodeData = await this.cacheManager.get(email);
    if (!emailCodeData || emailCodeData !== emailCode) {
      throw new BadRequestException(Error.NOT_MATCH_EMAIL_CODE);
    }

    await Promise.all(
      phones.map(async (phone, i) => {
        const phoneCodeData = await this.cacheManager.get(phone);
        if (!phoneCodeData || phoneCodeData !== phoneCodes[i]) {
          throw new BadRequestException(Error.NOT_MATCH_PHONE_CODE);
        }
      })
    );
  }

  async execute(command: RegisterCubeezCommand) {
    const { data } = command;
    const { email, password, name, nickname, sns, introduce, phones, emailCode, phoneCodes, isBusiness } = data;
    const { zipcode, address, addressDetail, businessType, businessName } = data;
    const option = this.config.get<string>('DISABLE_VERIFY_IDENTITY');

    if (option === 'false') {
      await this.checkCode(email, phones, emailCode, phoneCodes);
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newCubeez = await this.commandBus.execute(
        new CreateCubeezCommand({
          email,
          password,
          name,
          nickname,
          sns,
          introduce,
          phones,
          isBusiness,
          zipcode,
          address,
          addressDetail,
          businessType,
          businessName
        })
      );
      const cubeez = await queryRunner.manager.save(newCubeez);

      await queryRunner.commitTransaction();
      await this.cacheManager.del(email);
      await Promise.all(phones.map(async (phone) => this.cacheManager.del(phone)));

      const targetAdmins = await this.queryBus.execute(
        new GetAdminByRuleQuery({
          code: '회원',
          canApprove: true
        })
      );
      if (option === 'false') {
        await this.commandBus.execute(
          new SendEmailCommand({
            to: targetAdmins.map(({ email: i }) => i),
            subject: CubeezRequestTemplate(name).subject,
            body: CubeezRequestTemplate(name).body
          })
        );
      }
      await this.commandBus.execute(
        new SendNotificationCommand(
          'ADMIN',
          {
            type: 'WHEN_CUBEEZ_REGISTER',
            payload: {
              name: newCubeez.name
            }
          },
          undefined,
          {
            code: '회원',
            canApprove: true
          }
        )
      );
      Logger.log({ message: `새로운 큐비즈가 가입 신청을 하였습니다.`, who: email });

      return cubeez;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
