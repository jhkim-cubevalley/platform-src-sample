import { Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CubeezPhone } from '../domain/cubeez-phone.entity';
import { SetCubeezPhoneCommand } from '../commands/set-cubeez-phone.command';

@Injectable()
@CommandHandler(SetCubeezPhoneCommand)
export class SetCubeezPhoneHandler implements ICommandHandler<SetCubeezPhoneCommand> {
  constructor(@InjectRepository(CubeezPhone) private readonly cubeezPhoneRepository: Repository<CubeezPhone>) {}

  async execute(command: SetCubeezPhoneCommand) {
    const { cubeez: uid, phones } = command.data;
    await this.cubeezPhoneRepository.delete({ cubeez: { uid } });
    Logger.log({ message: `큐비즈 핸드폰 번호를 설정했습니다.`, uid });
    return Promise.all(phones.map((phone) => this.cubeezPhoneRepository.save({ cubeez: { uid }, phone })));
  }
}
