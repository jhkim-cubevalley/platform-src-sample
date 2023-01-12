import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetContractQuery } from '../../queries/contract/get-contract.query';
import { Contract } from '../../domain/contract/contract.entity';
import { Error } from '../../../../infrastructure/common/error';

@Injectable()
@QueryHandler(GetContractQuery)
export class GetContractHandler implements IQueryHandler<GetContractQuery> {
  constructor(@InjectRepository(Contract) private readonly contractRepository: Repository<Contract>) {}

  async execute({ id }: GetContractQuery): Promise<Contract | undefined> {
    const result = await this.contractRepository.findOne({
      where: {
        id
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
