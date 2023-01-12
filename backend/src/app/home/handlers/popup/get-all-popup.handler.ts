import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Popup } from '../../domain/popup/popup.entity';
import { GetAllPopupQuery } from '../../queries/popup/get-all-popup.query';
import Pagination from '../../../../infrastructure/common/types/pagination-type';

@Injectable()
@QueryHandler(GetAllPopupQuery)
export class GetAllPopupHandler implements IQueryHandler<GetAllPopupQuery> {
  constructor(@InjectRepository(Popup) private readonly repository: Repository<Popup>) {}

  async execute({ data }: GetAllPopupQuery): Promise<Pagination<Popup>> {
    const { offset, limit } = data;
    let pageOption = {};
    if (offset && limit) {
      pageOption = {
        take: limit,
        skip: limit * (offset - 1)
      };
    }

    const [result, total] = await this.repository.findAndCount({
      ...pageOption,
      where: {
        isEnable: data.filters.isEnable
      }
    });

    return {
      data: result,
      pageTotal: result.length,
      total
    };
  }
}
