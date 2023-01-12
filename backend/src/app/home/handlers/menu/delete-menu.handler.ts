import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Error } from '../../../../infrastructure/common/error';
import { DeleteMenuCommand } from '../../commands/menu/delete-menu.command';
import { Menu } from '../../domain/menu/menu.entity';
import { GetMenuQuery } from '../../queries/menu/get-menu.query';
import { reorderPriorityWhenDelete } from '../../../../infrastructure/common/util';

@Injectable()
@CommandHandler(DeleteMenuCommand)
export class DeleteMenuHandler implements ICommandHandler<DeleteMenuCommand> {
  constructor(
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
    private readonly queryBus: QueryBus
  ) {}

  async execute({ id }: DeleteMenuCommand) {
    const menu = await this.queryBus.execute<unknown, Menu | undefined>(new GetMenuQuery(id));
    if (!menu) throw new NotFoundException(Error.NOT_FOUND_MENU);
    if (menu.next?.length > 0) throw new BadRequestException(Error.MUST_DELETE_CHILDREN_MENU_BEFORE);
    if (menu.productOne?.length > 0) throw new BadRequestException(Error.CAN_NOT_DELETE_BECAUSE_OF_RELATION);
    if (menu.productTwo?.length > 0) throw new BadRequestException(Error.CAN_NOT_DELETE_BECAUSE_OF_RELATION);
    if (menu.productThree?.length > 0) throw new BadRequestException(Error.CAN_NOT_DELETE_BECAUSE_OF_RELATION);

    await this.menuRepository.delete({
      id
    });
    await reorderPriorityWhenDelete(this.menuRepository, menu.parent, menu.depth);

    Logger.log({ message: `메뉴를 삭제했습니다.`, name: menu.nameKo });
    return true;
  }
}
