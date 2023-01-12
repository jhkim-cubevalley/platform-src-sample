import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './domain/region/region.entity';
import { GetRegionHandler } from './handlers/region/get-region.handler';
import { GetRegionByNameHandler } from './handlers/region/get-region-by-name.handler';
import { GetRegionByCodeHandler } from './handlers/region/get-region-by-code.handler';
import { CreateRegionHandler } from './handlers/region/create-region.handler';
import { UpdateRegionHandler } from './handlers/region/update-region.handler';
import { GetAllRegionHandler } from './handlers/region/get-all-region.handler';
import { DeleteRegionHandler } from './handlers/region/delete-region.handler';
import { RegionController } from './controllers/region.controller';
import { Product } from './domain/product/product.entity';
import { ProductImage } from './domain/product/product-image.entity';
import { ProductFlight } from './domain/product/product-flight.entity';
import { ProductPlan } from './domain/product/product-plan.entity';
import { ProductPlanDetail } from './domain/product/product-plan-detail.entity';
import { ProductNote } from './domain/product/product-note.entity';
import { ProductRegion } from './domain/product/product-region.entity';
import { ProductCategory } from './domain/product/product-category.entity';
import { GetAllProductHandler } from './handlers/product/get-all-product.handler';
import { GetProductHandler } from './handlers/product/get-product.handler';
import { CreateProductHandler } from './handlers/product/create-product.handler';
import { AddProductImageHandler } from './handlers/product/add-product-image.handler';
import { DeleteProductHandler } from './handlers/product/delete-product.handler';
import { ProductHistory } from './domain/product/product-history.entity';
import { ApproveProductHandler } from './handlers/product/approve-product.handler';
import { DenyProductHandler } from './handlers/product/deny-product.handler';
import { ProductController } from './controllers/product.controller';
import { UpdateProductHandler } from './handlers/product/update-product.handler';
import { Incentive } from './domain/incentive/incentive.entity';
import { CreateIncentiveHandler } from './handlers/incentive/create-incentive.handler';
import { AddIncentiveAnswerHandler } from './handlers/incentive/add-incentive-answer.handler';
import { SetIncentiveManagerHandler } from './handlers/incentive/set-incentive-manager.handler';
import { GetIncentiveHandler } from './handlers/incentive/get-incentive.handler';
import { GetAllIncentiveHandler } from './handlers/incentive/get-all-incentive.handler';
import { IncentiveController } from './controllers/incentive.controller';
import { ProductTos } from './domain/product/product-tos.entity';
import { Badge } from './domain/badge/badge.entity';
import { CreateBadgeHandler } from './handlers/badge/create-badge.handler';
import { DeleteBadgeHandler } from './handlers/badge/delete-badge.handler';
import { GetBadgeHandler } from './handlers/badge/get-badge.handler';
import { GetAllBadgeHandler } from './handlers/badge/get-all-badge.handler';
import { BadgeController } from './controllers/badge.controller';
import { ProductApprove } from './domain/product/product-approve.entity';
import { RequestApproveProductHandler } from './handlers/product/request-approve-product.handler';
import { SetManagerProductHandler } from './handlers/product/set-manager-product.handler';
import { SetProductToIncentiveHandler } from './handlers/incentive/set-product-to-incentive.handler';
import { Contract } from './domain/contract/contract.entity';
import { ContractTos } from './domain/contract/contract-tos.entity';
import { GetAllContractHandler } from './handlers/contract/get-all-contract.handler';
import { GetContractHandler } from './handlers/contract/get-contract.handler';
import { GetContractByNameHandler } from './handlers/contract/get-contract-by-name.handler';
import { CreateContractHandler } from './handlers/contract/create-contract.handler';
import { UpdateContractHandler } from './handlers/contract/update-contract.handler';
import { DeleteContractHandler } from './handlers/contract/delete-contract.handler';
import { SetContractToProductHandler } from './handlers/product/set-contract-to-product.handler';
import { ContractController } from './controllers/contract.controller';
import { ProductViewcount } from './domain/product/product-viewcount.entity';
import { IncreaseProductViewcountHandler } from './handlers/product/increase-product-viewcount.handler';
import { GetProductFlightHandler } from './handlers/product/get-product-flight.handler';
import { GetProductNoteHandler } from './handlers/product/get-product-note.handler';
import { GetProductPlanHandler } from './handlers/product/get-product-plan.handler';
import { GetProductTosHandler } from './handlers/product/get-product-tos.handler';
import { GetAllProductHistoryHandler } from './handlers/product/get-all-product-history.handler';
import { CancelRequestApproveProductHandler } from './handlers/product/cancel-request-approve-product.handler';

const regionHandlers = [
  CreateRegionHandler,
  UpdateRegionHandler,
  DeleteRegionHandler,
  GetAllRegionHandler,
  GetRegionHandler,
  GetRegionByNameHandler,
  GetRegionByCodeHandler
];
const productHandlers = [
  CreateProductHandler,
  AddProductImageHandler,
  UpdateProductHandler,
  DeleteProductHandler,
  ApproveProductHandler,
  DenyProductHandler,
  GetAllProductHandler,
  GetProductHandler,
  RequestApproveProductHandler,
  SetManagerProductHandler,
  SetContractToProductHandler,
  IncreaseProductViewcountHandler,
  GetProductFlightHandler,
  GetProductNoteHandler,
  GetProductPlanHandler,
  GetProductTosHandler,
  GetAllProductHistoryHandler,
  CancelRequestApproveProductHandler
];
const incentiveHandlers = [
  CreateIncentiveHandler,
  AddIncentiveAnswerHandler,
  SetIncentiveManagerHandler,
  GetIncentiveHandler,
  GetAllIncentiveHandler,
  SetProductToIncentiveHandler
];
const badgeHandlers = [CreateBadgeHandler, DeleteBadgeHandler, GetBadgeHandler, GetAllBadgeHandler];
const contractHandlers = [
  GetAllContractHandler,
  GetContractHandler,
  GetContractByNameHandler,
  CreateContractHandler,
  UpdateContractHandler,
  DeleteContractHandler
];

const controllers = [RegionController, ProductController, IncentiveController, BadgeController, ContractController];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductImage,
      ProductFlight,
      ProductPlan,
      ProductPlanDetail,
      ProductNote,
      ProductRegion,
      ProductCategory,
      ProductHistory,
      ProductTos,
      ProductApprove,
      ProductViewcount,
      Region,
      Incentive,
      Badge,
      Contract,
      ContractTos
    ]),
    CqrsModule
  ],
  providers: [...regionHandlers, ...productHandlers, ...incentiveHandlers, ...badgeHandlers, ...contractHandlers],
  controllers: [...controllers]
})
export class ProductModule {}
