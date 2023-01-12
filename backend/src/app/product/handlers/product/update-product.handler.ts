import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UpdateProductCommand } from '../../commands/product/update-product.command';
import { Product } from '../../domain/product/product.entity';
import { Error } from '../../../../infrastructure/common/error';
import { ProductRegion } from '../../domain/product/product-region.entity';
import { ProductCategory } from '../../domain/product/product-category.entity';
import { ProductNote } from '../../domain/product/product-note.entity';
import { ProductFlight } from '../../domain/product/product-flight.entity';
import { ProductPlan } from '../../domain/product/product-plan.entity';
import { ProductPlanDetail } from '../../domain/product/product-plan-detail.entity';
import { ProductTos } from '../../domain/product/product-tos.entity';
import { ProductImage } from '../../domain/product/product-image.entity';
import { AddProductImageCommand } from '../../commands/product/add-product-image.command';
import { getFlightInfo } from '../../../../infrastructure/externals/flight-api';
import { filterHTML } from '../../../../infrastructure/common/util';
import { GetTosQuery } from '../../../tos/queries/get-tos.query';
import { GetRegionQuery } from '../../queries/region/get-region.query';
import { GetMenuQuery } from '../../../home/queries/menu/get-menu.query';

@Injectable()
@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
  constructor(
    private readonly config: ConfigService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly connection: Connection,
    @InjectRepository(ProductRegion) private readonly productRegionRepository: Repository<ProductRegion>,
    @InjectRepository(ProductCategory) private readonly productCategoryRepository: Repository<ProductCategory>,
    @InjectRepository(ProductNote) private readonly productNoteRepository: Repository<ProductNote>,
    @InjectRepository(ProductFlight) private readonly productFlightRepository: Repository<ProductFlight>,
    @InjectRepository(ProductPlan) private readonly productPlanRepository: Repository<ProductPlan>,
    @InjectRepository(ProductPlanDetail) private readonly productPlanDetailRepository: Repository<ProductPlanDetail>,
    @InjectRepository(ProductTos) private readonly productTosRepository: Repository<ProductTos>
  ) {}

  async execute({ product, data }: UpdateProductCommand): Promise<boolean> {
    const { regions, categories, flights, notes, plans, tos, content, moreNote, caution, refund, images, ...input } =
      data;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.update(
        Product,
        { id: product.id },
        {
          ...input,
          content: content ? filterHTML(content) : undefined,
          moreNote: moreNote ? filterHTML(moreNote) : undefined,
          caution: caution ? filterHTML(caution) : undefined,
          refund: refund ? filterHTML(refund) : undefined
        }
      );

      if (images?.length >= 0) {
        await queryRunner.manager.delete(ProductImage, { product: { id: product.id } });
        // eslint-disable-next-line no-param-reassign
        product.image = [];
        if (images?.length >= 1) {
          await Promise.all(
            images.map(async (image) => {
              await this.commandBus.execute(
                new AddProductImageCommand(image.url, image.isThumb, product, queryRunner.manager)
              );
            })
          );
        }
      }

      if (regions?.length >= 0) {
        await queryRunner.manager.delete(ProductRegion, { product: { id: product.id } });
        if (regions?.length >= 1) {
          await Promise.all(
            regions.map(async (region) => {
              const regionOne = await this.queryBus.execute(new GetRegionQuery(region.regionOne));
              const regionTwo = await this.queryBus.execute(new GetRegionQuery(region.regionTwo));
              const regionThree = await this.queryBus.execute(new GetRegionQuery(region.regionThree));
              if (!regionOne || !regionTwo || !regionThree) throw new NotFoundException(Error.NOT_FOUND_REGION);
              if (!regionOne.isEnable || !regionTwo.isEnable || !regionThree.isEnable) {
                throw new BadRequestException(Error.DISABLE_DATAS);
              }
              const productRegion = this.productRegionRepository.create({
                product,
                regionOne: { id: region.regionOne },
                regionTwo: { id: region.regionTwo },
                regionThree: { id: region.regionThree }
              });
              await queryRunner.manager.save(productRegion);
              return productRegion;
            })
          );
        }
      }

      if (categories?.length >= 0) {
        await queryRunner.manager.delete(ProductCategory, { product: { id: product.id } });
        if (categories?.length >= 1) {
          await Promise.all(
            categories.map(async (category) => {
              const categoryOne = await this.queryBus.execute(new GetMenuQuery(category.categoryOne));
              if (!categoryOne) throw new NotFoundException(Error.NOT_FOUND_REGION);
              if (!categoryOne.isEnable) throw new BadRequestException(Error.DISABLE_DATAS);
              if (category.categoryTwo) {
                const categoryTwo = await this.queryBus.execute(new GetMenuQuery(category.categoryTwo));
                if (!categoryTwo) throw new NotFoundException(Error.NOT_FOUND_REGION);
                if (!categoryTwo.isEnable) throw new BadRequestException(Error.DISABLE_DATAS);
              }
              if (category.categoryThree) {
                const categoryThree = await this.queryBus.execute(new GetMenuQuery(category.categoryThree));
                if (!categoryThree) throw new NotFoundException(Error.NOT_FOUND_REGION);
                if (!categoryThree.isEnable) throw new BadRequestException(Error.DISABLE_DATAS);
              }

              const productCategory = this.productCategoryRepository.create({
                product,
                categoryOne: { id: category.categoryOne },
                categoryTwo: category.categoryTwo ? { id: category.categoryTwo } : undefined,
                categoryThree: category.categoryThree ? { id: category.categoryThree } : undefined
              });
              await queryRunner.manager.save(productCategory);
            })
          );
        }
      }

      if (flights?.length >= 0) {
        await queryRunner.manager.delete(ProductFlight, { product: { id: product.id } });
        if (flights?.length >= 1) {
          await Promise.all(
            flights.map(async (flight) => {
              const departure = flight.departureTime.toString().split(':');
              const arrival = flight.arrivalTime.toString().split(':');
              const flightApiData = await getFlightInfo(this.config, flight.flightName);
              const productFlight = this.productFlightRepository.create({
                ...flight,
                product,
                company: flightApiData?.company ?? flight.company,
                moveTime: flightApiData?.moveTime ?? flight.moveTime,
                departureTime: flightApiData?.startTime ?? `${departure[0]}:${departure[1]}:${departure[2]}`,
                arrivalTime: flightApiData?.arrivalTime ?? `${arrival[0]}:${arrival[1]}:${arrival[2]}`
              });
              await queryRunner.manager.save(productFlight);
            })
          );
        }
      }

      if (notes?.length >= 0) {
        await queryRunner.manager.delete(ProductNote, { product: { id: product.id } });
        if (notes?.length >= 1) {
          await Promise.all(
            notes.map(async (note) => {
              const productNote = this.productNoteRepository.create({
                product,
                ...note
              });
              await queryRunner.manager.save(productNote);
            })
          );
        }
      }

      if (plans?.length >= 0) {
        await queryRunner.manager.delete(ProductPlan, { product: { id: product.id } });
        if (plans?.length >= 1) {
          await Promise.all(
            plans.map(async (plan) => {
              const productPlan = this.productPlanRepository.create({
                ...plan,
                product
              });
              await queryRunner.manager.save(productPlan);

              await Promise.all(
                plan.details.map(async (detail) => {
                  const productPlanDetail = this.productPlanDetailRepository.create({
                    ...detail,
                    productPlan,
                    content: detail.content ? filterHTML(detail.content) : undefined,
                    library: detail.libraryId ? { id: detail.libraryId } : undefined
                  });
                  await queryRunner.manager.save(productPlanDetail);
                })
              );
            })
          );
        }
      }

      if (tos?.length >= 0) {
        await queryRunner.manager.delete(ProductTos, { product: { id: product.id } });
        if (tos?.length >= 1) {
          await Promise.all(
            tos.map(async (tosId) => {
              const existsTos = await this.queryBus.execute(new GetTosQuery(tosId));
              if (!existsTos) throw new NotFoundException(Error.NOT_FOUND_TOS);
              const productTos = this.productTosRepository.create({
                product,
                tos: { id: tosId }
              });
              await queryRunner.manager.save(productTos);
            })
          );
        }
      }

      await queryRunner.commitTransaction();
      Logger.log({ message: `여행상품을 수정했습니다.`, id: product.id });
      return true;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
