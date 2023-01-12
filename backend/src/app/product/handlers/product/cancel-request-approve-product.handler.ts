import { Injectable } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from '../../commands/product/update-product.command';
import { AddHistoryCommand } from '../../../history/commands/add-history.command';
import { ProductHistory } from '../../domain/product/product-history.entity';
import { CancelRequestApproveProductCommand } from '../../commands/product/cancel-request-approve-product.command';
import { SendNotificationCommand } from '../../../notification/commands/send-notification.command';

@Injectable()
@CommandHandler(CancelRequestApproveProductCommand)
export class CancelRequestApproveProductHandler implements ICommandHandler<CancelRequestApproveProductCommand> {
  constructor(private readonly commandBus: CommandBus) {}

  async execute({ product }: CancelRequestApproveProductCommand): Promise<boolean> {
    await this.commandBus.execute(
      new UpdateProductCommand(product, {
        status: 'temp'
      })
    );

    await this.commandBus.execute(
      new SendNotificationCommand(
        'ADMIN',
        {
          type: 'CANCEL_REQUEST_APPROVE_PRODUCT',
          payload: {
            id: product.id,
            name: product.name
          }
        },
        undefined,
        {
          code: '여행상품',
          canApprove: true
        }
      )
    );

    await this.commandBus.execute(
      new AddHistoryCommand({
        entity: ProductHistory,
        title: '승인 요청을 취소하였습니다.',
        relation: {
          product: { id: product.id }
        }
      })
    );

    return true;
  }
}
