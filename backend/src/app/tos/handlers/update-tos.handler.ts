import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTosCommand } from '../commands/update-tos.command';
import { Tos } from '../domain/tos.entity';
import { Error } from '../../../infrastructure/common/error';
import { filterHTML } from '../../../infrastructure/common/util';

@Injectable()
@CommandHandler(UpdateTosCommand)
export class UpdateTosHandler implements ICommandHandler<UpdateTosCommand> {
  constructor(@InjectRepository(Tos) private readonly tosRepository: Repository<Tos>) {}

  async execute({ id, data }: UpdateTosCommand): Promise<boolean> {
    const clearContent = filterHTML(data.content);
    const { affected } = await this.tosRepository.update(
      { id },
      {
        isEnable: data.isEnable,
        content: clearContent,
        name: data.name
      }
    );
    if (affected <= 0) throw new NotFoundException(Error.NOT_FOUND_MENU);
    Logger.log({ message: `약관을 수정했습니다.`, id });
    return true;
  }
}
