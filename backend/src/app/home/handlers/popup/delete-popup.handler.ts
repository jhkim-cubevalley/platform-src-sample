import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Popup } from '../../domain/popup/popup.entity';
import { DeletePopupCommand } from '../../commands/popup/delete-popup.command';
import { GetPopupQuery } from '../../queries/popup/get-popup.query';
import { Error } from '../../../../infrastructure/common/error';

@Injectable()
@CommandHandler(DeletePopupCommand)
export class DeletePopupHandler implements ICommandHandler<DeletePopupCommand> {
  constructor(
    @InjectRepository(Popup) private readonly repository: Repository<Popup>,
    private readonly queryBus: QueryBus
  ) {}

  async execute({ id }: DeletePopupCommand): Promise<boolean> {
    const popup = await this.queryBus.execute(new GetPopupQuery(id));
    if (!popup) throw new NotFoundException(Error.NOT_FOUND_POPUP);
    await this.repository.delete(id);
    Logger.log({ message: '팝업을 삭제했습니다.', id });
    return true;
  }
}
