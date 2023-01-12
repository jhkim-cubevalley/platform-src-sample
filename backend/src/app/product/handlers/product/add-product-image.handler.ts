import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddProductImageCommand } from '../../commands/product/add-product-image.command';
import { ProductImage } from '../../domain/product/product-image.entity';
import { Error } from '../../../../infrastructure/common/error';

@Injectable()
@CommandHandler(AddProductImageCommand)
export class AddProductImageHandler implements ICommandHandler<AddProductImageCommand> {
  constructor(@InjectRepository(ProductImage) private readonly productImageRepository: Repository<ProductImage>) {}

  async execute({ url, isThumb, product, transaction }: AddProductImageCommand): Promise<ProductImage> {
    if (product && product.image && product.image.length >= 5) {
      throw new ConflictException(Error.CAN_NOT_UPLOAD_IMAGE);
    }

    const image = this.productImageRepository.create({
      product,
      imageUrl: url,
      isThumb
    });
    if (transaction) {
      await transaction.save(image);
    } else {
      await this.productImageRepository.save(image);
    }
    Logger.log({ message: `여행상품에 이미지를 추가했습니다.`, id: product.id });
    return image;
  }
}
