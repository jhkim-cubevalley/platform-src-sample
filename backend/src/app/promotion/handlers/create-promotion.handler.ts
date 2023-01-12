import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Promotion } from '../domain/promotion.entity';
import { CreatePromotionCommand } from '../commands/create-promotion.command';
import { PromotionProduct } from '../domain/promotion-product.entity';
import { GetProductQuery } from '../../product/queries/product/get-product.query';
import { Product } from '../../product/domain/product/product.entity';
import { Error } from '../../../infrastructure/common/error';
import { GetEventQuery } from '../../event/queries/get-event.query';
import { Event } from '../../event/domain/event.entity';
import { filterHTML } from '../../../infrastructure/common/util';
import { GetPartnerQuery } from '../../partner/queries/get-partner.query';

@Injectable()
@CommandHandler(CreatePromotionCommand)
export class CreatePromotionHandler implements ICommandHandler<CreatePromotionCommand> {
  constructor(
    @InjectRepository(Promotion) private readonly promotionRepository: Repository<Promotion>,
    @InjectRepository(PromotionProduct) private readonly promotionProductRepository: Repository<PromotionProduct>,
    private readonly queryBus: QueryBus,
    private readonly connection: Connection
  ) {}

  async execute({ data }: CreatePromotionCommand): Promise<Promotion> {
    const { products, content, partnerId, ...input } = data;
    const clearContent = filterHTML(content);
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existsPartner = await this.queryBus.execute(new GetPartnerQuery(partnerId));
      if (!existsPartner) throw new NotFoundException(Error.NOT_FOUND_PARTNER);

      const promotion = this.promotionRepository.create({
        ...input,
        partner: partnerId ? { id: partnerId } : undefined,
        content: clearContent
      });
      await queryRunner.manager.save(promotion);

      await Promise.all(
        products.map(async ({ productId, eventIds, value, isPercent }) => {
          const product = await this.queryBus.execute<unknown, Product>(new GetProductQuery(productId));
          if (!product) throw new NotFoundException(Error.NOT_FOUND_PRODUCT);
          await Promise.all(
            eventIds.map(async (eventId) => {
              const event = await this.queryBus.execute<unknown, Event>(new GetEventQuery(eventId));
              if (!event || event.product.id !== productId) {
                throw new NotFoundException(Error.NOT_FOUND_EVENT);
              }
              const promotionProduct = this.promotionProductRepository.create({
                product: { id: productId },
                promotion,
                event: { id: eventId },
                isPercent,
                value
              });
              await queryRunner.manager.save(promotionProduct);
            })
          );
        })
      );

      await queryRunner.commitTransaction();
      Logger.log({ message: '새로운 프로모션을 추가했습니다.', id: promotion.id, type: promotion.type });
      return promotion;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
