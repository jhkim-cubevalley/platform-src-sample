import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Contract } from '../../domain/contract/contract.entity';
import { ContractTos } from '../../domain/contract/contract-tos.entity';
import { GetContractByNameQuery } from '../../queries/contract/get-contract-by-name.query';
import { Error } from '../../../../infrastructure/common/error';
import { GetTosQuery } from '../../../tos/queries/get-tos.query';
import { Tos } from '../../../tos/domain/tos.entity';
import { UpdateContractCommand } from '../../commands/contract/update-contract.command';
import { GetContractQuery } from '../../queries/contract/get-contract.query';

@Injectable()
@CommandHandler(UpdateContractCommand)
export class UpdateContractHandler implements ICommandHandler<UpdateContractCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly connection: Connection,
    @InjectRepository(Contract) private readonly contractRepository: Repository<Contract>,
    @InjectRepository(ContractTos) private readonly contractTosRepository: Repository<ContractTos>
  ) {}

  async execute({ id, data }: UpdateContractCommand) {
    const { tos, ...input } = data;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const contract = await this.queryBus.execute<unknown, Contract | undefined>(new GetContractQuery(id));
      if (!contract) throw new NotFoundException(Error.NOT_FOUND_CONTRACT);

      const existsName = await this.queryBus.execute(new GetContractByNameQuery(input.name));
      if (existsName && contract.id !== existsName.id) throw new ConflictException(Error.CONTRACT_NAME_ALREADY_EXISTS);

      await queryRunner.manager.update(Contract, id, input);

      if (tos) {
        await queryRunner.manager.delete(ContractTos, { contract: { id } });
        await Promise.all(
          tos.map(async (tosId) => {
            const tosData = await this.queryBus.execute<unknown, Tos | undefined>(new GetTosQuery(tosId));
            if (!tosData) throw new NotFoundException(Error.NOT_FOUND_TOS);

            const contractTos = this.contractTosRepository.create({
              tos: tosData,
              contract
            });
            await queryRunner.manager.save(contractTos);
          })
        );
      }

      await queryRunner.commitTransaction();
      Logger.log({ message: '계약서를 수정했습니다.', id: contract.id });
      return contract;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
