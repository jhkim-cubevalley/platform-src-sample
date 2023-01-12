import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Error } from '../../../../infrastructure/common/error';
import { CreateMenuCommand } from '../../commands/menu/create-menu.command';
import { Menu } from '../../domain/menu/menu.entity';
import { GetMenuQuery } from '../../queries/menu/get-menu.query';
import { GetMenuByNameQuery } from '../../queries/menu/get-menu-by-name.query';
import { GetMenuByCodeQuery } from '../../queries/menu/get-menu-by-code.query';
import { reorderPriority } from '../../../../infrastructure/common/util';

@Injectable()
@CommandHandler(CreateMenuCommand)
export class CreateMenuHandler implements ICommandHandler<CreateMenuCommand> {
  constructor(
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
    private readonly queryBus: QueryBus
  ) {}

  async execute({ data }: CreateMenuCommand): Promise<Menu> {
    const { parentId, ...input } = data;

    const prevByName = await this.queryBus.execute(new GetMenuByNameQuery(data.nameKo, true));
    const prevByNameEn = await this.queryBus.execute(new GetMenuByNameQuery(data.nameEn, false));
    const prevByCode = await this.queryBus.execute(new GetMenuByCodeQuery(data.code));
    if (prevByName) throw new ConflictException(Error.MENU_ALREADY_EXISTS);
    if (prevByNameEn) throw new ConflictException(Error.MENU_ALREADY_EXISTS);
    if (prevByCode) throw new ConflictException(Error.MENU_ALREADY_EXISTS);
    if (parentId) {
      const parent = await this.queryBus.execute(new GetMenuQuery(parentId));
      if (!parent) throw new NotFoundException(Error.NOT_FOUND_MENU);
    }

    await reorderPriority(this.menuRepository, data.priority, parentId, data.depth);

    const result = this.menuRepository.create({
      ...input,
      parent: parentId ? { id: parentId } : null
    });
    await this.menuRepository.save(result);
    Logger.log({ message: `메뉴를 추가했습니다.`, name: input.nameKo });
    return result;
  }
}
