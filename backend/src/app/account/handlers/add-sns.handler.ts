import { Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddSnsCommand } from '../commands/add-sns.command';
import { AccountSns } from '../domain/account-sns.entity';

@Injectable()
@CommandHandler(AddSnsCommand)
export class AddSnsHandler implements ICommandHandler<AddSnsCommand> {
  constructor(@InjectRepository(AccountSns) private readonly accountSnsRepository: Repository<AccountSns>) {}

  async execute(command: AddSnsCommand) {
    const { name, handle, user, cubeez } = command;

    if (user === null && cubeez === null) throw new Error('user와 cubeez 모두 null일 수 없습니다.');
    if (user !== null) {
      return this.accountSnsRepository.create({
        user,
        name,
        handle
      });
    }
    if (cubeez !== null) {
      return this.accountSnsRepository.create({
        cubeez,
        name,
        handle
      });
    }

    Logger.log({ message: `SNS계정 정보를 추가했습니다.`, name, handle, who: user.uid || cubeez.uid });

    return Promise.resolve();
  }
}
