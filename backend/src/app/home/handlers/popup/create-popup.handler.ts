import { Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePopupCommand } from '../../commands/popup/create-popup.command';
import { Popup } from '../../domain/popup/popup.entity';

@Injectable()
@CommandHandler(CreatePopupCommand)
export class CreatePopupHandler implements ICommandHandler<CreatePopupCommand> {
  constructor(@InjectRepository(Popup) private readonly repository: Repository<Popup>) {}

  async execute({ data }: CreatePopupCommand): Promise<Popup> {
    const popup = this.repository.create(data);
    await this.repository.save(popup);
    Logger.log({ message: '새로운 팝업을 생성했습니다.', id: popup.id });
    return popup;
  }
}
