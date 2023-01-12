import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from '../../domain/menu/menu.entity';
import { GetMenuByCodeQuery } from '../../queries/menu/get-menu-by-code.query';

@Injectable()
@QueryHandler(GetMenuByCodeQuery)
export class GetMenuByCodeHandler implements IQueryHandler<GetMenuByCodeQuery> {
  constructor(@InjectRepository(Menu) private readonly menuRepository: Repository<Menu>) {}

  async execute({ code }: GetMenuByCodeQuery): Promise<Menu | undefined> {
    const result = await this.menuRepository.findOne({
      where: { code },
      relations: {
        next: true,
        parent: true
      }
    });
    if (!result) return undefined;
    return result;
  }
}
