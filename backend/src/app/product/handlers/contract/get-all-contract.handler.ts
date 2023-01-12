import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from '../../domain/contract/contract.entity';
import { GetAllContractQuery } from '../../queries/contract/get-all-contract.query';

@Injectable()
@QueryHandler(GetAllContractQuery)
export class GetAllContractHandler implements IQueryHandler<GetAllContractQuery> {
  constructor(@InjectRepository(Contract) private readonly contractRepository: Repository<Contract>) {}

  async execute(): Promise<Contract[]> {
    return this.contractRepository.find({
      order: {
        id: 'asc'
      },
      relations: {
        tos: true,
        products: true
      }
    });
  }
}
