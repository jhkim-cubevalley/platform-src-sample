import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import { CreateCubeezCommand } from '../commands/create-cubeez.command';
import { Cubeez } from '../domain/cubeez.entity';
import { Error } from '../../../infrastructure/common/error';
import { GetCubeezByEmailQuery } from '../queries/get-cubeez-by-email.query';
import { GetCubeezByNicknameQuery } from '../queries/get-cubeez-by-nickname.query';
import { GetCubeezByPhoneQuery } from '../queries/get-cubeez-by-phone.query';
import { AddSnsCommand } from '../../account/commands/add-sns.command';
import { AddCubeezPhoneCommand } from '../commands/add-cubeez-phone.command';

@Injectable()
@CommandHandler(CreateCubeezCommand)
export class CreateCubeezHandler implements ICommandHandler<CreateCubeezCommand> {
  constructor(
    @InjectRepository(Cubeez) private readonly cubeezRepository: Repository<Cubeez>,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly connection: Connection,
    private readonly config: ConfigService
  ) {}

  async checkDuplicateCubeez(email, nickname, phones, isBusiness) {
    const cubeez = await this.queryBus.execute(new GetCubeezByEmailQuery(email));
    if (cubeez) throw new ConflictException(Error.CUBEEZ_ALREADY_EXISTS);
    if (!isBusiness) {
      const cubeezByNickname = await this.queryBus.execute(new GetCubeezByNicknameQuery(nickname));
      if (cubeezByNickname) throw new ConflictException(Error.NICKNAME_ALREADY_EXISTS);
    }
    await Promise.all(
      phones.map(async (phone) => {
        const cubeezByPhone = await this.queryBus.execute(new GetCubeezByPhoneQuery(phone));
        if (cubeezByPhone !== undefined) throw new ConflictException(Error.PHONE_ALREADY_EXISTS);
      })
    );
  }

  async execute(command: CreateCubeezCommand) {
    const { email, name, nickname, password, sns, introduce, phones, isBusiness: bus } = command.data;
    const queryRunner = this.connection.createQueryRunner();
    const hashRound = parseInt(this.config.get('PASSWORD_SALT_ROUND', '12'), 10);
    const isBusiness = String(bus) === 'true';

    await this.checkDuplicateCubeez(email, nickname, phones, isBusiness);
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let businessInfo = {};
      if (isBusiness) {
        const { zipcode, address, addressDetail, businessName, businessType } = command.data;
        businessInfo = { zipcode, address, addressDetail, businessName, businessType };
      }

      const newCubeez = await this.cubeezRepository.create({
        email,
        password: await hash(password, hashRound),
        name,
        nickname,
        introduce,
        isBusiness,
        ...businessInfo
      });
      const result = await queryRunner.manager.save(newCubeez);

      await Promise.all(
        phones.map(async (phone) => {
          const newSns = await this.commandBus.execute(
            new AddCubeezPhoneCommand({
              cubeez: result,
              phone
            })
          );
          await queryRunner.manager.save(newSns);
        })
      );

      await Promise.all(
        sns.map(async (each) => {
          const newSns = await this.commandBus.execute(new AddSnsCommand(null, result, each.name, each.handle));
          await queryRunner.manager.save(newSns);
        })
      );

      await queryRunner.commitTransaction();

      delete result.password;
      Logger.log({ message: `큐비즈 계정을 추가했습니다.`, uid: newCubeez.uid });
      return result;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
