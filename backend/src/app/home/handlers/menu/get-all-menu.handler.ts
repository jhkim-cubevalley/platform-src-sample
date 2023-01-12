import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetAllMenuQuery } from '../../queries/menu/get-all-menu.query';
import { Menu } from '../../domain/menu/menu.entity';
import Pagination from '../../../../infrastructure/common/types/pagination-type';

@Injectable()
@QueryHandler(GetAllMenuQuery)
export class GetAllMenuHandler implements IQueryHandler<GetAllMenuQuery> {
  constructor(@InjectRepository(Menu) private readonly menuRepository: Repository<Menu>) {}

  async execute({ data }: GetAllMenuQuery): Promise<Pagination<Menu>> {
    const { offset, limit } = data;
    let pageOption = {};
    if (offset && limit) {
      pageOption = {
        take: limit,
        skip: limit * (offset - 1)
      };
    }

    const [result, total] = await this.menuRepository.findAndCount({
      ...pageOption,
      order: {
        createdAt: data.filters.sort === 'newest' ? 'DESC' : undefined,
        productOne:
          data.filters.sort === 'best'
            ? {
                product: {
                  viewcount: { view: 'asc' }
                }
              }
            : undefined,
        productTwo:
          data.filters.sort === 'best'
            ? {
                product: {
                  viewcount: { view: 'asc' }
                }
              }
            : undefined,
        productThree:
          data.filters.sort === 'best'
            ? {
                product: {
                  viewcount: { view: 'asc' }
                }
              }
            : undefined
      },
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

    return {
      data: result,
      pageTotal: result.length,
      total
    };
  }
}
