import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tos } from '../domain/tos.entity';
import { GetTosByNameQuery } from '../queries/get-tos-by-name.query';

@Injectable()
@QueryHandler(GetTosByNameQuery)
export class GetTosByNameHandler implements IQueryHandler<GetTosByNameQuery> {
  constructor(@InjectRepository(Tos) private readonly tosRepository: Repository<Tos>) {}

  async execute({ name }: GetTosByNameQuery): Promise<Tos | undefined> {
    const result = await this.tosRepository.findOne({
      where: { name },
      relations: {
        productTos: {
          product: true
        }
      }
    });
    if (!result) return undefined;
    return result;
  }
}
