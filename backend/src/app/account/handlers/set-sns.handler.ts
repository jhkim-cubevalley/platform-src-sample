import { Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountSns } from '../domain/account-sns.entity';
import { SetSnsCommand } from '../commands/set-sns.command';

@Injectable()
@CommandHandler(SetSnsCommand)
export class SetSnsHandler implements ICommandHandler<SetSnsCommand> {
  constructor(@InjectRepository(AccountSns) private readonly accountSnsRepository: Repository<AccountSns>) {}

  async execute({ data }: SetSnsCommand): Promise<AccountSns[]> {
    const { user, cubeez, sns } = data;

    if (user === null && cubeez === null) throw new Error('user와 cubeez 모두 null일 수 없습니다.');
    if (user !== null) {
      await this.accountSnsRepository.delete({ user: { uid: user } });
      return Promise.all(
        sns.map(async ({ name, handle }) => {
          const result = this.accountSnsRepository.create({
            user: { uid: user },
            name,
            handle
          });
          await this.accountSnsRepository.save(result);
          return result;
        })
      );
    }
    if (cubeez !== null) {
      await this.accountSnsRepository.delete({ cubeez: { uid: cubeez } });
      return Promise.all(
        sns.map(async ({ name, handle }) => {
          const result = this.accountSnsRepository.create({
            cubeez: { uid: cubeez },
            name,
            handle
          });
          await this.accountSnsRepository.save(result);
          return result;
        })
      );
    }

    Logger.log({ message: `SNS계정 정보를 새로 설정했습니다.`, who: user || cubeez });

    return Promise.resolve([]);
  }
}
