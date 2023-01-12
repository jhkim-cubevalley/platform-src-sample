import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../domain/product/product.entity';
import { SetContractToProductCommand } from '../../commands/product/set-contract-to-product.command';
import { GetProductQuery } from '../../queries/product/get-product.query';
import { Error } from '../../../../infrastructure/common/error';
import { GetContractQuery } from '../../queries/contract/get-contract.query';

@Injectable()
@CommandHandler(SetContractToProductCommand)
export class SetContractToProductHandler implements ICommandHandler<SetContractToProductCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) {}

  async execute({ productId, contractId }: SetContractToProductCommand): Promise<boolean> {
    const product = await this.queryBus.execute(new GetProductQuery(productId));
    if (!product) throw new NotFoundException(Error.NOT_FOUND_PRODUCT);
    const contract = await this.queryBus.execute(new GetContractQuery(contractId));
    if (!contract) throw new NotFoundException(Error.NOT_FOUND_CONTRACT);

    await this.productRepository.update({ id: productId }, { contract });
    Logger.log({ message: '여행상품에 계약서를 연결했습니다.', productId, contractId });
    return true;
  }
}
