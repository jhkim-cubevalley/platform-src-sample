import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Connection, QueryFailedError } from 'typeorm';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { DeleteProductCommand } from '../../commands/product/delete-product.command';
import { Error } from '../../../../infrastructure/common/error';
import { Product } from '../../domain/product/product.entity';
import { GetProductQuery } from '../../queries/product/get-product.query';
import { ProductImage } from '../../domain/product/product-image.entity';
import { ProductFlight } from '../../domain/product/product-flight.entity';
import { ProductNote } from '../../domain/product/product-note.entity';
import { ProductPlan } from '../../domain/product/product-plan.entity';
import { ProductHistory } from '../../domain/product/product-history.entity';
import { ProductCategory } from '../../domain/product/product-category.entity';
import { ProductRegion } from '../../domain/product/product-region.entity';
import { ProductTos } from '../../domain/product/product-tos.entity';
import { ProductApprove } from '../../domain/product/product-approve.entity';
import { ProductViewcount } from '../../domain/product/product-viewcount.entity';
import { EventFlight } from '../../../event/domain/event-flight.entity';
import { EventPlan } from '../../../event/domain/event-plan.entity';
import { EventType } from '../../../event/domain/event-type.entity';
import { EventEditFile } from '../../../event/domain/event-edit-file.entity';
import { EventHistory } from '../../../event/domain/event-history.entity';
import { EventMemo } from '../../../event/domain/event-memo.entity';
import { Event } from '../../../event/domain/event.entity';
import { GetEventQuery } from '../../../event/queries/get-event.query';
import { GetAllEventQuery } from '../../../event/queries/get-all-event.query';
import Pagination from '../../../../infrastructure/common/types/pagination-type';

@Injectable()
@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
  constructor(
    private readonly config: ConfigService,
    private readonly queryBus: QueryBus,
    private readonly connection: Connection,
    @InjectAwsService(S3) private readonly s3: S3
  ) {}

  async execute({ id }: DeleteProductCommand): Promise<boolean> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const product = await this.queryBus.execute<unknown, Product | undefined>(new GetProductQuery(id));
      if (!product) throw new NotFoundException(Error.NOT_FOUND_PRODUCT);

      await Promise.all(
        product.image.map(async ({ imageUrl }) => {
          await this.s3
            .deleteObject({
              Bucket: this.config.get('AWS_IMAGE_BUCKET'),
              Key: imageUrl.split('/').pop()
            })
            .promise();
        })
      );

      const { data: events } = await this.queryBus.execute<unknown, Pagination<Event>>(
        new GetAllEventQuery({
          filters: { productId: id }
        })
      );
      if (events?.length > 0) {
        await Promise.all(
          events.map(async ({ id: eventId }) => {
            const event = await this.queryBus.execute<unknown, Event | undefined>(new GetEventQuery(eventId));
            if (!event) return;
            await Promise.all(
              event.editFiles.map(async ({ url }) => {
                await this.s3
                  .deleteObject({
                    Bucket: this.config.get('AWS_IMAGE_BUCKET'),
                    Key: url
                  })
                  .promise();
              })
            );
            await queryRunner.manager.delete(EventEditFile, { event });
            await queryRunner.manager.delete(EventHistory, { event });
            await queryRunner.manager.delete(EventMemo, { event });
            await queryRunner.manager.delete(Event, { id: eventId });
            await queryRunner.manager.delete(EventFlight, { eventType: event.eventType });
            await queryRunner.manager.delete(EventPlan, { eventType: event.eventType });
            await queryRunner.manager.delete(EventType, { id: event.eventType.id });
          })
        );
      }

      await queryRunner.manager.delete(ProductViewcount, { product });
      await queryRunner.manager.delete(ProductApprove, { product });
      await queryRunner.manager.delete(ProductHistory, { product });
      await queryRunner.manager.delete(ProductImage, { product });
      await queryRunner.manager.delete(ProductFlight, { product });
      await queryRunner.manager.delete(ProductNote, { product });
      await queryRunner.manager.delete(ProductCategory, { product });
      await queryRunner.manager.delete(ProductRegion, { product });
      await queryRunner.manager.delete(ProductPlan, { product });
      await queryRunner.manager.delete(ProductTos, { product });
      await queryRunner.manager.delete(Product, { id });
      await queryRunner.commitTransaction();

      Logger.log({ message: '여행 상품과 관련 행사를 삭제했습니다.', id });
      return true;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      if (e instanceof QueryFailedError) {
        throw new ConflictException(Error.CAN_NOT_DELETE_BECAUSE_OF_RELATION);
      } else throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
