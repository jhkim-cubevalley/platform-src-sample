import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CreateProductCommand } from '../../commands/product/create-product.command';
import { Product } from '../../domain/product/product.entity';
import { Cubeez } from '../../../cubeez/domain/cubeez.entity';
import { Admin } from '../../../admin/domain/admin.entity';
import { ProductRegion } from '../../domain/product/product-region.entity';
import { ProductCategory } from '../../domain/product/product-category.entity';
import { ProductFlight } from '../../domain/product/product-flight.entity';
import { ProductNote } from '../../domain/product/product-note.entity';
import { ProductPlan } from '../../domain/product/product-plan.entity';
import { ProductPlanDetail } from '../../domain/product/product-plan-detail.entity';
import { ProductTos } from '../../domain/product/product-tos.entity';
import { GetGroupQuery } from '../../../account/queries/group/get-group.query';
import { Error } from '../../../../infrastructure/common/error';
import { GetRegionQuery } from '../../queries/region/get-region.query';
import { GetMenuQuery } from '../../../home/queries/menu/get-menu.query';
import { AddProductImageCommand } from '../../commands/product/add-product-image.command';
import { getFlightInfo } from '../../../../infrastructure/externals/flight-api';
import { filterHTML } from '../../../../infrastructure/common/util';
import { GetTosQuery } from '../../../tos/queries/get-tos.query';

@Injectable()
@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(
    private readonly config: ConfigService,
    private readonly connection: Connection,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductRegion) private readonly productRegionRepository: Repository<ProductRegion>,
    @InjectRepository(ProductCategory) private readonly productCategoryRepository: Repository<ProductCategory>,
    @InjectRepository(ProductNote) private readonly productNoteRepository: Repository<ProductNote>,
    @InjectRepository(ProductFlight) private readonly productFlightRepository: Repository<ProductFlight>,
    @InjectRepository(ProductPlan) private readonly productPlanRepository: Repository<ProductPlan>,
    @InjectRepository(ProductPlanDetail) private readonly productPlanDetailRepository: Repository<ProductPlanDetail>,
    @InjectRepository(ProductTos) private readonly productTosRepository: Repository<ProductTos>
  ) {}

  /* eslint-disable no-restricted-syntax */
  private generateProductCode(
    idx: number,
    isBusiness: boolean,
    isAdmin: boolean,
    regions: ProductRegion[],
    type: 'P' | 'F' | 'V'
  ): string {
    const countryCode = regions[0].regionOne.code;
    let businessCode = 'N';
    if (isAdmin) businessCode = 'C';
    else if (isBusiness) businessCode = 'B';
    const code = regions[0].regionOne.code || regions[0].regionTwo.code || regions[0].regionThree.code;
    const regionNumberCode = Number.isNaN(code) ? '0' : code;
    return `${businessCode}${countryCode}${type}${regionNumberCode}${idx.toString().padStart(3, '0')}`;
  }

  async execute({ data }: CreateProductCommand): Promise<Product> {
    const {
      author,
      regions,
      categories,
      flights,
      notes,
      plans,
      tos,
      manageGroupId,
      isForIncentive,
      content,
      moreNote,
      caution,
      refund,
      images,
      ...input
    } = data;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existsGroup = await this.queryBus.execute(new GetGroupQuery(manageGroupId));
      if (!existsGroup) throw new NotFoundException(Error.NOT_FOUND_GROUP);
      if (regions.length <= 0) throw new BadRequestException(Error.REQUIRED_REGION);

      const product = this.productRepository.create({
        ...input,
        code: `TEMP${new Date().getTime()}`,
        content: filterHTML(content),
        moreNote: filterHTML(moreNote),
        caution: filterHTML(caution),
        refund: filterHTML(refund),
        manageGroup: { id: manageGroupId },
        cubeez: author instanceof Cubeez ? author : null,
        admin: author instanceof Admin ? author : null
      });
      await queryRunner.manager.save(product);

      const productRegions = await Promise.all(
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
            regionOne,
            regionTwo,
            regionThree
          });
          await queryRunner.manager.save(productRegion);
          return productRegion;
        })
      );

      if (images && images.length > 0) {
        await Promise.all(
          images.map(async (image) => {
            await this.commandBus.execute(
              new AddProductImageCommand(image.url, image.isThumb, product, queryRunner.manager)
            );
          })
        );
      }

      if (categories && categories.length > 0) {
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

      if (flights && flights.length > 0) {
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

      if (notes && notes.length > 0) {
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

      if (plans && plans.length > 0) {
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
                  content: content ? filterHTML(detail.content) : undefined,
                  library: detail.libraryId ? { id: detail.libraryId } : undefined
                });
                await queryRunner.manager.save(productPlanDetail);
              })
            );
          })
        );
      }

      if (tos && tos.length > 0) {
        await Promise.all(
          tos.map(async (id) => {
            const existsTos = await this.queryBus.execute(new GetTosQuery(id));
            if (!existsTos) throw new NotFoundException(Error.NOT_FOUND_TOS);
            const productTos = this.productTosRepository.create({
              product,
              tos: { id }
            });
            await queryRunner.manager.save(productTos);
          })
        );
      }

      product.code = this.generateProductCode(
        product.id,
        product.cubeez && product.cubeez.isBusiness,
        !!product.admin,
        productRegions,
        isForIncentive ? 'V' : 'P'
      );
      await queryRunner.manager.save(product);

      await queryRunner.commitTransaction();
      if (data.status === 'temp') Logger.log({ message: `여행 상품을 임시저장했습니다.`, id: product.id });
      else Logger.log({ message: `새로운 여행 상품을 추가했습니다.`, id: product.id });
      return product;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
