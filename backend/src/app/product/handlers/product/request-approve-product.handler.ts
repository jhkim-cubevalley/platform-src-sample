import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RequestApproveProductCommand } from '../../commands/product/request-approve-product.command';
import { UpdateProductCommand } from '../../commands/product/update-product.command';
import { AddHistoryCommand } from '../../../history/commands/add-history.command';
import { ProductHistory } from '../../domain/product/product-history.entity';
import { CreateDefaultEventCommand } from '../../../event/commands/create-default-event.command';
import { Error } from '../../../../infrastructure/common/error';
import { SendEmailCommand } from '../../../email/send-email.command';

@Injectable()
@CommandHandler(RequestApproveProductCommand)
export class RequestApproveProductHandler implements ICommandHandler<RequestApproveProductCommand> {
  constructor(private readonly commandBus: CommandBus) {}

  async execute({ data }: RequestApproveProductCommand): Promise<boolean> {
    const { product, requestMessage } = data;
    const prevStatus = product.status;

    const checkFields = [
      'priceAdult',
      'priceTeen',
      'priceKid',
      'minPeople',
      'maxPeople',
      'departure',
      'dateForm',
      'dateTo',
      'departurePeriod',
      'endDay',
      'description',
      'pros',
      'tag',
      'content',
      'tripDate',
      'tripNight',
      'moreNote',
      'caution',
      'refund'
    ];

    checkFields.forEach((field) => {
      if (product[field] === null) {
        throw new BadRequestException(Error.INVALID_PRODUCT_INPUT);
      }
    });

    await this.commandBus.execute(
      new UpdateProductCommand(product, {
        status: 'request_approve',
        requestMessage
      })
    );

    if (product.cubeez) {
      await this.commandBus.execute(
        new SendEmailCommand({
          to: [product.cubeez.email],
          subject: `[큐비즈] 상품을 승인 요청했습니다.`,
          body: `[${product.name}] 승인이 요청 되었습니다.`
        })
      );
    }

    await this.commandBus.execute(
      new AddHistoryCommand({
        entity: ProductHistory,
        title: '승인 요청 하였습니다.',
        message: requestMessage,
        relation: {
          product: { id: product.id }
        }
      })
    );

    if (prevStatus === 'temp') {
      await this.commandBus.execute(new CreateDefaultEventCommand(product));
    }

    return true;
  }
}
