import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Error } from '../../../../infrastructure/common/error';
import { UpdateMenuCommand } from '../../commands/menu/update-menu.command';
import { Menu } from '../../domain/menu/menu.entity';
import { GetMenuByNameQuery } from '../../queries/menu/get-menu-by-name.query';
import { GetMenuByCodeQuery } from '../../queries/menu/get-menu-by-code.query';
import { GetMenuQuery } from '../../queries/menu/get-menu.query';
import { reorderPriority } from '../../../../infrastructure/common/util';

@Injectable()
@CommandHandler(UpdateMenuCommand)
export class UpdateMenuHandler implements ICommandHandler<UpdateMenuCommand> {
  constructor(
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
    private readonly queryBus: QueryBus
  ) {}

  async execute({ id, data }: UpdateMenuCommand): Promise<boolean> {
    const menu = await this.queryBus.execute<unknown, Menu | undefined>(new GetMenuQuery(id));
    if (!menu) throw new NotFoundException(Error.NOT_FOUND_MENU);

    const prevByName = await this.queryBus.execute(new GetMenuByNameQuery(data.nameKo, true));
    const prevByNameEn = await this.queryBus.execute(new GetMenuByNameQuery(data.nameEn, false));
    const prevByCode = await this.queryBus.execute(new GetMenuByCodeQuery(data.code));
    if (prevByName && prevByName.id !== id) throw new ConflictException(Error.MENU_ALREADY_EXISTS);
    if (prevByNameEn && prevByNameEn.id !== id) throw new ConflictException(Error.MENU_ALREADY_EXISTS);
    if (prevByCode && prevByCode.id !== id) throw new ConflictException(Error.MENU_ALREADY_EXISTS);

    if (menu.priority !== data.priority) {
      await reorderPriority(this.menuRepository, data.priority, menu.parent.id, menu.depth);
    }
    await this.menuRepository.update({ id }, { ...data });
    Logger.log({ message: `메뉴를 수정했습니다.`, id });
    return true;
  }
}
