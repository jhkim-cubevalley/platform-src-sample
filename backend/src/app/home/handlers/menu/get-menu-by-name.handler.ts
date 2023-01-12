import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetMenuByNameQuery } from '../../queries/menu/get-menu-by-name.query';
import { Menu } from '../../domain/menu/menu.entity';

@Injectable()
@QueryHandler(GetMenuByNameQuery)
export class GetMenuByNameHandler implements IQueryHandler<GetMenuByNameQuery> {
  constructor(@InjectRepository(Menu) private readonly menuRepository: Repository<Menu>) {}

  async execute({ name, isKo }: GetMenuByNameQuery): Promise<Menu | undefined> {
    const result = await this.menuRepository.findOne({
      where: {
        [isKo ? 'nameKo' : 'nameEn']: name
      },
      relations: {
        next: true,
        parent: true
      }
    });
    if (!result) return undefined;
    return result;
  }
}
