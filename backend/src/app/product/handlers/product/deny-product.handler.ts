import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../domain/product/product.entity';
import { GetProductQuery } from '../../queries/product/get-product.query';
import { Error } from '../../../../infrastructure/common/error';
import { DenyProductCommand } from '../../commands/product/deny-product.command';
import { ProductApprove } from '../../domain/product/product-approve.entity';
import { AddHistoryCommand } from '../../../history/commands/add-history.command';
import { ProductHistory } from '../../domain/product/product-history.entity';

@Injectable()
@CommandHandler(DenyProductCommand)
export class DenyProductHandler implements ICommandHandler<DenyProductCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductApprove) private readonly productApproveRepository: Repository<ProductApprove>
  ) {}

  async execute({ data }: DenyProductCommand): Promise<boolean> {
    const { id, admin, reason } = data;
    const product = await this.queryBus.execute<unknown, Product | undefined>(new GetProductQuery(id));
    if (!product) throw new NotFoundException(Error.NOT_FOUND_PRODUCT);

    if (!product.manageGroup) throw new BadRequestException(Error.CAN_NOT_PRODUCT_APPROVE_OR_DENY);
    if (product.status !== 'request_approve') throw new BadRequestException(Error.CAN_NOT_PRODUCT_APPROVE_OR_DENY);

    const isIncludeAdminGroup = product.manageGroup.admin.map(({ uid }) => uid).includes(admin.uid);
    if (!isIncludeAdminGroup) throw new ForbiddenException(Error.YOUR_NOT_PRODUCT_MANAGE_GROUP);

    const isHaveDeny = product.approves.find((a) => !a.isApprove && a.denyReason !== null);
    if (product.approves.length > 0 && isHaveDeny) throw new BadRequestException(Error.CAN_NOT_PRODUCT_APPROVE_OR_DENY);

    const existsDeny = await this.productApproveRepository.findOne({ where: { product, admin: { uid: admin.uid } } });
    if (existsDeny) {
      await this.productApproveRepository.update({ product, admin }, { isApprove: false, denyReason: reason });
    } else {
      const deny = this.productApproveRepository.create({
        product,
        admin,
        isApprove: false,
        denyReason: reason
      });
      await this.productApproveRepository.save(deny);
    }
    await this.commandBus.execute(
      new AddHistoryCommand({
        entity: ProductHistory,
        title: '반려 되었습니다. 상품 수정 후 재승인 요청해 주세요.',
        message: reason,
        relation: {
          product: { id: product.id }
        }
      })
    );

    Logger.log({ message: `여행상품을 반려했습니다.`, id: product.id, adminUid: admin.uid, reason });
    return true;
  }
}
