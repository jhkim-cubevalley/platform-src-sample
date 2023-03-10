import {
  BadRequestException,
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TokenGuard } from '../../../infrastructure/guards/token.guard';
import { Error } from '../../../infrastructure/common/error';
import Pagination from '../../../infrastructure/common/types/pagination-type';
import { Product, ProductStatusKO } from '../domain/product/product.entity';
import { GetProductQuery } from '../queries/product/get-product.query';
import { GetAllProductQuery } from '../queries/product/get-all-product.query';
import { GetAllProductDto } from '../domain/product/get-all-product.dto';
import { DeleteProductCommand } from '../commands/product/delete-product.command';
import { CreateProductCommand } from '../commands/product/create-product.command';
import { CreateProductDto } from '../domain/product/create-product.dto';
import { GetCubeezByEmailQuery } from '../../cubeez/queries/get-cubeez-by-email.query';
import { GetAdminByEmailQuery } from '../../admin/queries/get-admin-by-email.query';
import { UpdateProductDto } from '../domain/product/update-product.dto';
import { UpdateProductCommand } from '../commands/product/update-product.command';
import { RoleGuard } from '../../../infrastructure/guards/role.guard';
import { ApproveProductCommand } from '../commands/product/approve-product.command';
import { DenyProductDto } from '../domain/product/deny-product.dto';
import { DenyProductCommand } from '../commands/product/deny-product.command';
import { Admin } from '../../admin/domain/admin.entity';
import { RequestProductDto } from '../domain/product/request-product.dto';
import { RequestApproveProductCommand } from '../commands/product/request-approve-product.command';
import { SetManagerProductDto } from '../domain/product/set-manager-product.dto';
import { GetGroupQuery } from '../../account/queries/group/get-group.query';
import { SetManagerProductCommand } from '../commands/product/set-manager-product.command';
import { Group } from '../../account/domain/group.entity';
import { CreateDefaultEventCommand } from '../../event/commands/create-default-event.command';
import { Cubeez } from '../../cubeez/domain/cubeez.entity';
import { SetContractToProductDto } from '../domain/product/set-contract-to-product.dto';
import { SetContractToProductCommand } from '../commands/product/set-contract-to-product.command';
import { IncreasePromotionViewcountCommand } from '../../promotion/commands/increase-promotion-viewcount.command';
import { IncreaseProductViewcountCommand } from '../commands/product/increase-product-viewcount.command';
import { AddHistoryCommand } from '../../history/commands/add-history.command';
import { ProductHistory } from '../domain/product/product-history.entity';
import { SetStatusDto } from '../domain/product/set-status.dto';
import { EventType } from '../../event/domain/event-type.entity';
import { GetAllEventTypeByProductQuery } from '../../event/queries/get-all-event-type-by-product.query';
import { GetProductFlightQuery } from '../queries/product/get-product-flight.query';
import { ProductFlight } from '../domain/product/product-flight.entity';
import { ProductNote } from '../domain/product/product-note.entity';
import { GetProductNoteQuery } from '../queries/product/get-product-note.query';
import { ProductPlan } from '../domain/product/product-plan.entity';
import { GetProductPlanQuery } from '../queries/product/get-product-plan.query';
import { ProductTos } from '../domain/product/product-tos.entity';
import { GetProductTosQuery } from '../queries/product/get-product-tos.query';
import { GetAllEventQuery } from '../../event/queries/get-all-event.query';
import { GetAllProductHistoryQuery } from '../queries/product/get-all-product-history.query';
import { CancelRequestApproveProductCommand } from '../commands/product/cancel-request-approve-product.command';

@ApiTags('product - ????????????')
@UseInterceptors(CacheInterceptor)
@Controller('product')
export class ProductController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @ApiOperation({
    description: '????????? ????????? ??????????????? ???????????????.',
    summary: '?????????'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['CUBEEZ']))
  @Get('/me')
  async getAllMyData(@Req() req, @Query() query: GetAllProductDto): Promise<Pagination<Product>> {
    const { offset, limit, ...filters } = query;
    const cubeez = await this.queryBus.execute(new GetCubeezByEmailQuery(req.decode.email));
    return this.queryBus.execute<unknown, Pagination<Product>>(
      new GetAllProductQuery({
        offset,
        limit,
        filters: {
          ...filters,
          cubeezName: cubeez.name,
          dateFrom: filters.dateFrom ? new Date(filters.dateFrom) : undefined,
          dateTo: filters.dateTo ? new Date(filters.dateTo) : undefined
        }
      })
    );
  }

  @ApiOperation({
    description: '??????????????? ???????????????.',
    summary: '????????????'
  })
  @Get('/:id')
  async get(@Req() req, @Param('id') id: number): Promise<Product> {
    const result = await this.queryBus.execute<unknown, Product>(new GetProductQuery(id));
    if (!result) throw new NotFoundException(Error.NOT_FOUND_PRODUCT);
    const promotionIds = result.promotionProducts
      .filter(({ promotion }) => promotion.isEnable)
      .filter(({ promotion }) => promotion.dateFrom)
      .map(({ promotion }) => promotion.id);
    await Promise.all(
      Array.from(new Set(promotionIds)).map(async (promotionId) => {
        await this.commandBus.execute(new IncreasePromotionViewcountCommand({ promotionId, product: result }));
      })
    );
    await this.commandBus.execute(new IncreaseProductViewcountCommand(result));
    return result;
  }

  @ApiOperation({
    description: '???????????? ????????? ????????? ???????????????.',
    summary: '????????????'
  })
  @Get('/:id/flight')
  async getFlight(@Param('id') id: number): Promise<ProductFlight[]> {
    const result = await this.queryBus.execute(new GetProductFlightQuery(id));
    return result;
  }

  @ApiOperation({
    description: '???????????? ??????, ??????????????? ????????? ???????????????.',
    summary: '????????????'
  })
  @Get('/:id/note')
  async getNote(@Param('id') id: number): Promise<ProductNote[]> {
    const result = await this.queryBus.execute(new GetProductNoteQuery(id));
    return result;
  }

  @ApiOperation({
    description: '???????????? ?????? ????????? ???????????????.',
    summary: '????????????'
  })
  @Get('/:id/plan')
  async getPlan(@Param('id') id: number): Promise<ProductPlan[]> {
    const result = await this.queryBus.execute(new GetProductPlanQuery(id));
    return result;
  }

  @ApiOperation({
    description: '???????????? ?????? ????????? ???????????????.',
    summary: '????????????'
  })
  @Get('/:id/tos')
  async getTos(@Param('id') id: number): Promise<ProductTos[]> {
    const result = await this.queryBus.execute(new GetProductTosQuery(id));
    return result;
  }

  @ApiOperation({
    description: '???????????? ??????????????? ???????????????.',
    summary: '????????????'
  })
  @Get('/:id/history')
  async getHistory(@Param('id') id: number): Promise<ProductHistory[]> {
    return this.queryBus.execute(new GetAllProductHistoryQuery(id));
  }

  @ApiOperation({
    description: '?????? ??????????????? ???????????????.',
    summary: '????????????'
  })
  @Get('/')
  async getAll(@Req() req, @Query() query: GetAllProductDto): Promise<Pagination<Product>> {
    const { offset, limit, ...filters } = query;
    return this.queryBus.execute<unknown, Pagination<Product>>(
      new GetAllProductQuery({
        offset,
        limit,
        filters: {
          ...filters,
          dateFrom: filters.dateFrom ? new Date(filters.dateFrom) : undefined,
          dateTo: filters.dateTo ? new Date(filters.dateTo) : undefined
        }
      })
    );
  }

  @ApiOperation({
    description: `
    ????????? ??????????????? ???????????????.\n
    ???????????? ?????? ??? ???????????? ??????????????? ?????? ??????A ????????? ???????????????.
    ?????? ???????????? ?????? API??? ????????? ???????????????.
    `,
    summary: '?????????, ?????????(????????????)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['CUBEEZ', 'ADMIN']), RoleGuard([{ roleCode: '????????????', canUpdate: true }]))
  @Post('/')
  async create(@Req() req, @Body() body: CreateProductDto): Promise<Product> {
    let author: Cubeez | Admin;
    if (req.decode.type === 'CUBEEZ') author = await this.queryBus.execute(new GetCubeezByEmailQuery(req.decode.email));
    if (req.decode.type === 'ADMIN') author = await this.queryBus.execute(new GetAdminByEmailQuery(req.decode.email));

    const { dateFrom, dateTo } = body;
    const createCommand = new CreateProductCommand({
      ...body,
      dateFrom: new Date(dateFrom),
      dateTo: new Date(dateTo),
      author
    });
    const product = await this.commandBus.execute(createCommand);

    if (body.status === 'request_approve') {
      const updatedProduct = await this.queryBus.execute(new GetProductQuery(product.id));
      await this.commandBus.execute(new CreateDefaultEventCommand(updatedProduct));
    }
    await this.commandBus.execute(
      new AddHistoryCommand({
        entity: ProductHistory,
        title: `${product.name}??? ?????? ???????????????.`,
        relation: {
          product: { id: product.id }
        }
      })
    );
    return product;
  }

  @ApiOperation({
    description: '??????????????? ???????????????. (???????????? ??? ??????????????? ????????? ??? ????????????.)',
    summary: '?????????, ?????????(????????????)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['CUBEEZ', 'ADMIN']), RoleGuard([{ roleCode: '????????????', canUpdate: true }]))
  @Patch('/:id')
  async update(@Req() req, @Param('id') id: number, @Body() body: UpdateProductDto): Promise<boolean> {
    const product = await this.queryBus.execute<unknown, Product | undefined>(new GetProductQuery(id));
    if (!product) throw new NotFoundException(Error.NOT_FOUND_PRODUCT);

    const isHaveDeny = product.approves.find((a) => !a.isApprove && a.denyReason !== null);
    if (body.status === 'request_approve') throw new BadRequestException(Error.INVALILD_PRODUCT_STATUS);
    if (req.decode.type === 'CUBEEZ') {
      if (product.cubeez?.email !== req.decode.email) throw new ForbiddenException(Error.PERMISSION_DENIED);
      if (body.status === 'sale' || body.status === 'sale_end') throw new ForbiddenException(Error.PERMISSION_DENIED);
      if (product.status !== 'temp' || (product.approves.length > 0 && !isHaveDeny)) {
        throw new ForbiddenException(Error.CAN_NOT_UPDATE_PRODUCT);
      }
    }
    if (req.decode.type === 'ADMIN') {
      if (product.admin?.email !== req.decode.email) {
        if (product.status === 'temp' || (product.approves.length > 0 && isHaveDeny)) {
          throw new ForbiddenException(Error.CAN_NOT_UPDATE_PRODUCT);
        }
      }
    }

    await this.commandBus.execute(
      new UpdateProductCommand(product, {
        ...body,
        dateFrom: body.dateFrom ? new Date(body.dateFrom) : undefined,
        dateTo: body.dateTo ? new Date(body.dateTo) : undefined
      })
    );
    await this.commandBus.execute(
      new AddHistoryCommand({
        entity: ProductHistory,
        title: `${product.name}??? ${req.decode.email}??? ?????? ?????? ???????????????.`,
        relation: {
          product: { id: product.id }
        }
      })
    );

    return true;
  }

  @ApiOperation({
    description: '???????????? ????????? ???????????????.',
    summary: '?????????(????????????)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '????????????', canUpdate: true }]))
  @Post('/:id/status')
  async setStatus(@Req() req, @Param('id') id: number, @Body() body: SetStatusDto): Promise<boolean> {
    const product = await this.queryBus.execute<unknown, Product | undefined>(new GetProductQuery(id));
    if (!product) throw new NotFoundException(Error.NOT_FOUND_PRODUCT);
    await this.commandBus.execute(
      new UpdateProductCommand(product, {
        status: body.status
      })
    );
    if (body.status !== 'temp') {
      const { data: events } = await this.queryBus.execute(new GetAllEventQuery({ filters: { productId: id } }));
      if (!events || events.length === 0) await this.commandBus.execute(new CreateDefaultEventCommand(product));
    }
    await this.commandBus.execute(
      new AddHistoryCommand({
        entity: ProductHistory,
        title: `${product.name}??? ${req.decode.email}??? ?????? ????????? ${ProductStatusKO[body.status]}??? ?????? ???????????????.`,
        relation: {
          product: { id: product.id }
        }
      })
    );
    return true;
  }

  @ApiOperation({
    description:
      '??????????????? ???????????????. ??????????????? ????????? ??????(?????? ???)??? ????????? ????????? ??? ????????????. ???????????? ????????? ????????? ??????????????? ????????? ??? ????????????.',
    summary: '?????????, ?????????(????????????)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['CUBEEZ', 'ADMIN']), RoleGuard([{ roleCode: '????????????', canUpdate: true }]))
  @Delete('/:id')
  async delete(@Req() req, @Param('id') id: number): Promise<boolean> {
    const result = await this.queryBus.execute<unknown, Product | undefined>(new GetProductQuery(id));
    if (result) {
      if (req.decode.type === 'CUBEEZ') {
        if (!result.cubeez) throw new ForbiddenException(Error.PERMISSION_DENIED);
        if (result.cubeez.email !== req.decode.email) throw new ForbiddenException(Error.PERMISSION_DENIED);
        if (result.status !== 'temp') throw new ForbiddenException(Error.CAN_NOT_DELETE_PRODUCT);
      }
      if (req.decode.type === 'ADMIN') {
        if (result.status === 'temp') throw new ForbiddenException(Error.CAN_NOT_DELETE_PRODUCT);
      }
    }
    return this.commandBus.execute(new DeleteProductCommand(id));
  }

  @ApiOperation({
    description: '??????????????? ???????????????.',
    summary: '?????????(????????????)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '????????????', canApprove: true }]))
  @Post('/approve/:id')
  async approve(@Req() req, @Param('id') id: number): Promise<boolean> {
    const admin = await this.queryBus.execute<unknown, Admin>(new GetAdminByEmailQuery(req.decode.email));
    if (!admin) throw new NotFoundException(Error.NOT_FOUND_ADMIN);
    return this.commandBus.execute(
      new ApproveProductCommand({
        id,
        admin
      })
    );
  }

  @ApiOperation({
    description: '??????????????? ???????????????.',
    summary: '?????????(????????????)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '????????????', canApprove: true }]))
  @Post('/deny/:id')
  async deny(@Req() req, @Param('id') id: number, @Body() body: DenyProductDto): Promise<boolean> {
    const admin = await this.queryBus.execute<unknown, Admin>(new GetAdminByEmailQuery(req.decode.email));
    if (!admin) throw new NotFoundException(Error.NOT_FOUND_ADMIN);
    return this.commandBus.execute(new DenyProductCommand({ id, reason: body.reason, admin }));
  }

  @ApiOperation({
    description: '???????????? ??????????????? ????????????. ???????????? ????????? ????????? ??????????????? ????????? ??? ????????????.',
    summary: '?????????, ?????????'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['CUBEEZ', 'ADMIN']))
  @Post('/request/:id')
  async request(@Req() req, @Param('id') id: number, @Body() body: RequestProductDto): Promise<boolean> {
    const product = await this.queryBus.execute<unknown, Product>(new GetProductQuery(id));
    if (req.decode.type === 'CUBEEZ' && product.cubeez?.email !== req.decode.email) {
      throw new ForbiddenException(Error.PERMISSION_DENIED);
    }
    await this.commandBus.execute(
      new RequestApproveProductCommand({
        product,
        requestMessage: body.requestMessage
      })
    );
    return true;
  }

  @ApiOperation({
    description:
      '???????????? ??????????????? ???????????????.(?????? ???????????? ????????? ???????????????.) ???????????? ????????? ????????? ??????????????? ????????? ??? ????????????.',
    summary: '?????????, ?????????'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['CUBEEZ', 'ADMIN']))
  @Delete('/requestcancel/:id')
  async requestCancel(@Req() req, @Param('id') id: number): Promise<boolean> {
    const product = await this.queryBus.execute<unknown, Product>(new GetProductQuery(id));
    if (req.decode.type === 'CUBEEZ' && product.cubeez?.email !== req.decode.email) {
      throw new ForbiddenException(Error.PERMISSION_DENIED);
    }
    await this.commandBus.execute(new CancelRequestApproveProductCommand(product));
    return true;
  }

  @ApiOperation({
    description: '??????????????? ??????????????? ???????????????.',
    summary: '?????????(????????????)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '?????????', canUpdate: true }]))
  @Post('/manager/:id')
  async setManager(@Param('id') id: number, @Body() body: SetManagerProductDto): Promise<boolean> {
    const product = await this.queryBus.execute<unknown, Product>(new GetProductQuery(id));
    const group = await this.queryBus.execute<unknown, Group>(new GetGroupQuery(body.groupId));
    await this.commandBus.execute(
      new SetManagerProductCommand({
        product,
        group
      })
    );
    return true;
  }

  @ApiOperation({
    description: '??????????????? ???????????? ???????????????.',
    summary: '?????????(????????????)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '????????????', canUpdate: true }]))
  @Post('/contract/:id')
  async setContract(@Param('id') id: number, @Body() body: SetContractToProductDto): Promise<boolean> {
    await this.commandBus.execute(new SetContractToProductCommand(id, body.contractId));
    return true;
  }

  @ApiOperation({
    description: '???????????? ????????? ?????? ?????? ??????????????? ???????????????. (???????????? ??? ??????????????? ?????? ???????????????.)',
    summary: '?????????, ?????????(????????????)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['CUBEEZ', 'ADMIN']), RoleGuard([{ roleCode: '????????????', canUpdate: true }]))
  @Get('/:id/eventtype')
  async getAllEventType(@Req() req, @Param('id') id: number): Promise<EventType[]> {
    const product = await this.queryBus.execute<unknown, Product | undefined>(new GetProductQuery(id));
    if (!product) throw new NotFoundException(Error.NOT_FOUND_PRODUCT);
    if (req.decode.type === 'CUBEEZ') {
      if (product.cubeez.email !== req.decode.email) throw new ForbiddenException(Error.PERMISSION_DENIED);
    }
    return this.queryBus.execute(new GetAllEventTypeByProductQuery(id));
  }
}
