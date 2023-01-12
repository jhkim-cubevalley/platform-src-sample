import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddInquiryCommand } from '../commands/add-inquiry.command';
import { Inquiry } from '../domain/inquiry.entity';
import { GetProductQuery } from '../../product/queries/product/get-product.query';
import { Product } from '../../product/domain/product/product.entity';
import { Error } from '../../../infrastructure/common/error';
import { filterHTML } from '../../../infrastructure/common/util';

@Injectable()
@CommandHandler(AddInquiryCommand)
export class AddInquiryHandler implements ICommandHandler<AddInquiryCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectRepository(Inquiry) private readonly inquiryRepository: Repository<Inquiry>
  ) {}

  async execute(command: AddInquiryCommand): Promise<Inquiry> {
    const { title, content, author, category, productId } = command.data;
    if (productId) {
      const product = await this.queryBus.execute<unknown, Product | undefined>(new GetProductQuery(productId));
      if (!product) throw new NotFoundException(Error.NOT_FOUND_PRODUCT);
      if (product.cubeez && product.cubeez.email !== author.email) {
        throw new BadRequestException(Error.CAN_NOT_LINK_PRODUCT_TO_INQUIRY);
      }
    }

    const inquiry = this.inquiryRepository.create({
      title,
      content: filterHTML(content),
      author,
      category,
      product: productId ? { id: productId } : null
    });
    await this.inquiryRepository.save(inquiry);
    Logger.log({ message: `큐비즈 상담 내용을 추가했습니다.`, id: inquiry.id });
    return inquiry;
  }
}
