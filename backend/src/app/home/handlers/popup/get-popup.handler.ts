import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Popup } from '../../domain/popup/popup.entity';
import { GetPopupQuery } from '../../queries/popup/get-popup.query';

@Injectable()
@QueryHandler(GetPopupQuery)
export class GetPopupHandler implements IQueryHandler<GetPopupQuery> {
  constructor(@InjectRepository(Popup) private readonly repository: Repository<Popup>) {}

  async execute({ id }: GetPopupQuery): Promise<Popup | undefined> {
    const popup = await this.repository.findOne({ where: { id } });
    if (!popup) return undefined;
    return popup;
  }
}
