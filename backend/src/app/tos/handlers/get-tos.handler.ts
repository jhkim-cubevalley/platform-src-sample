import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetTosQuery } from '../queries/get-tos.query';
import { Tos } from '../domain/tos.entity';

@Injectable()
@QueryHandler(GetTosQuery)
export class GetTosHandler implements IQueryHandler<GetTosQuery> {
  constructor(@InjectRepository(Tos) private readonly tosRepository: Repository<Tos>) {}

  async execute({ id }: GetTosQuery): Promise<Tos | undefined> {
    const result = await this.tosRepository.findOne({
      where: { id },
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
