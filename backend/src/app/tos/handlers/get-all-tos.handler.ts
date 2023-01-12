import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetAllTosQuery } from '../queries/get-all-tos.query';
import { Tos } from '../domain/tos.entity';

@Injectable()
@QueryHandler(GetAllTosQuery)
export class GetAllTosHandler implements IQueryHandler<GetAllTosQuery> {
  constructor(@InjectRepository(Tos) private readonly tosRepository: Repository<Tos>) {}

  async execute(): Promise<Tos[]> {
    return this.tosRepository.find({
      order: {
        createdAt: 'desc'
      },
      relations: {
        productTos: {
          product: true
        }
      }
    });
  }
}
