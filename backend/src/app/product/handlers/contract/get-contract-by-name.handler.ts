import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from '../../domain/contract/contract.entity';
import { Error } from '../../../../infrastructure/common/error';
import { GetContractByNameQuery } from '../../queries/contract/get-contract-by-name.query';

@Injectable()
@QueryHandler(GetContractByNameQuery)
export class GetContractByNameHandler implements IQueryHandler<GetContractByNameQuery> {
  constructor(@InjectRepository(Contract) private readonly contractRepository: Repository<Contract>) {}

  async execute({ name }: GetContractByNameQuery): Promise<Contract | undefined> {
    const result = await this.contractRepository.findOne({
      where: {
        name
      },
      relations: {
        tos: true,
        products: true
      }
    });
    if (!result) throw new NotFoundException(Error.NOT_FOUND_CONTRACT);
    return result;
  }
}
