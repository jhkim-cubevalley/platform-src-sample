import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Promotion } from '../domain/promotion.entity';
import { PromotionProduct } from '../domain/promotion-product.entity';
import { GetProductQuery } from '../../product/queries/product/get-product.query';
import { UpdatePromotionCommand } from '../commands/update-promotion.command';
import { GetPromotionQuery } from '../queries/get-promotion.query';
import { Error } from '../../../infrastructure/common/error';
import { Product } from '../../product/domain/product/product.entity';
import { Event } from '../../event/domain/event.entity';
import { GetEventQuery } from '../../event/queries/get-event.query';
import { filterHTML } from '../../../infrastructure/common/util';
import { GetPartnerQuery } from '../../partner/queries/get-partner.query';

@Injectable()
@CommandHandler(UpdatePromotionCommand)
export class UpdatePromotionHandler implements ICommandHandler<UpdatePromotionCommand> {
  constructor(
    @InjectRepository(Promotion) private readonly promotionRepository: Repository<Promotion>,
    @InjectRepository(PromotionProduct) private readonly promotionProductRepository: Repository<PromotionProduct>,
    private readonly queryBus: QueryBus,
    private readonly connection: Connection
  ) {}

  async execute({ id, data }: UpdatePromotionCommand): Promise<Promotion> {
    const { products, content, partnerId, ...input } = data;
    const clearContent = filterHTML(content);
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const promotion = await this.queryBus.execute(new GetPromotionQuery(id));
      if (!promotion) throw new NotFoundException(Error.NOT_FOUND_PROMOTION);
      const existsPartner = await this.queryBus.execute(new GetPartnerQuery(partnerId));
      if (!existsPartner) throw new NotFoundException(Error.NOT_FOUND_PARTNER);

      await queryRunner.manager.update(
        Promotion,
        { id },
        {
          ...input,
          partner: partnerId ? { id: partnerId } : undefined,
          content: clearContent
        }
      );

      await queryRunner.manager.delete(PromotionProduct, { promotion: { id } });
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
                product,
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
      Logger.log({ message: '프로모션을 수정했습니다.', id: promotion.id, type: promotion.type });
      return promotion;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
