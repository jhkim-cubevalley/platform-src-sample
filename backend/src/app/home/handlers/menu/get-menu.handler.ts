import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetMenuQuery } from '../../queries/menu/get-menu.query';
import { Menu } from '../../domain/menu/menu.entity';

@Injectable()
@QueryHandler(GetMenuQuery)
export class GetMenuHandler implements IQueryHandler<GetMenuQuery> {
  constructor(@InjectRepository(Menu) private readonly menuRepository: Repository<Menu>) {}

  async execute({ id }: GetMenuQuery): Promise<Menu | undefined> {
    const result = await this.menuRepository.findOne({
      where: { id },
      relations: {
        next: true,
        parent: true,
        productOne: {
          product: true
        },
        productTwo: {
          product: true
        },
        productThree: {
          product: true
        }
      }
    });
    if (!result) return undefined;
    return result;
  }
}
