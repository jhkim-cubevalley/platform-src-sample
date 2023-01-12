import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteContractCommand } from '../../commands/contract/delete-contract.command';
import { Contract } from '../../domain/contract/contract.entity';
import { ContractTos } from '../../domain/contract/contract-tos.entity';
import { GetContractQuery } from '../../queries/contract/get-contract.query';
import { Error } from '../../../../infrastructure/common/error';

@Injectable()
@CommandHandler(DeleteContractCommand)
export class DeleteContractHandler implements ICommandHandler<DeleteContractCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectRepository(Contract) private readonly contractRepository: Repository<Contract>,
    @InjectRepository(ContractTos) private readonly contractTosRepository: Repository<ContractTos>
  ) {}

  async execute({ id }: DeleteContractCommand): Promise<boolean> {
    const contract = await this.queryBus.execute<unknown, Contract | undefined>(new GetContractQuery(id));
    if (!contract) throw new NotFoundException(Error.NOT_FOUND_CONTRACT);

    if (contract.products && contract.products.length > 0) {
      throw new ConflictException(Error.CAN_NOT_DELETE_BECAUSE_OF_RELATION);
    }

    await this.contractTosRepository.delete({ contract: { id } });
    await this.contractRepository.delete({ id });

    Logger.log({ message: '계약서를 삭제했습니다.', id });

    return true;
  }
}
