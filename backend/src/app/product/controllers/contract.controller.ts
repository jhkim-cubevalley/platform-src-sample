import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { TokenGuard } from '../../../infrastructure/guards/token.guard';
import { Error } from '../../../infrastructure/common/error';
import { RoleGuard } from '../../../infrastructure/guards/role.guard';
import { Contract } from '../domain/contract/contract.entity';
import { GetContractQuery } from '../queries/contract/get-contract.query';
import { GetAllContractQuery } from '../queries/contract/get-all-contract.query';
import { DeleteContractCommand } from '../commands/contract/delete-contract.command';
import { CreateContractCommand } from '../commands/contract/create-contract.command';
import { CreateContractDto } from '../domain/contract/create-contract.dto';
import { UpdateContractCommand } from '../commands/contract/update-contract.command';
import { UpdateContractDto } from '../domain/contract/update-contract.dto';

@ApiTags('contract - 계악서 관리')
@Controller('contract')
export class ContractController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @ApiOperation({ description: '계약서를 가져옵니다.', summary: '고객, 큐비즈, 관리자' })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['USER', 'CUBEEZ', 'ADMIN']))
  @Get('/:id')
  async get(@Req() req, @Param('id') id: number): Promise<Contract> {
    const result = await this.queryBus.execute<unknown, Contract>(new GetContractQuery(id));
    if (!result) throw new NotFoundException(Error.NOT_FOUND_CONTRACT);
    return result;
  }

  @ApiOperation({
    description: '모든 계약서를 가져옵니다.',
    summary: '고객, 큐비즈, 관리자'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['USER', 'CUBEEZ', 'ADMIN']))
  @Get('/')
  async getAll(): Promise<Contract[]> {
    return this.queryBus.execute<unknown, Contract[]>(new GetAllContractQuery());
  }

  @ApiOperation({
    description: '새로운 계약서를 생성합니다.',
    summary: '관리자(여행상품)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '여행상품', canUpdate: true }]))
  @Post('/')
  async create(@Body() body: CreateContractDto): Promise<Contract> {
    return this.commandBus.execute<unknown, Contract>(new CreateContractCommand(body));
  }

  @ApiOperation({
    description: '계약서를 수정합니다.',
    summary: '관리자(여행상품)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '여행상품', canUpdate: true }]))
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() body: UpdateContractDto): Promise<boolean> {
    return this.commandBus.execute(new UpdateContractCommand(id, body));
  }

  @ApiOperation({
    description: '계약서를 삭제합니다.',
    summary: '관리자(여행상품)'
  })
  @ApiBearerAuth()
  @UseGuards(TokenGuard(['ADMIN']), RoleGuard([{ roleCode: '여행상품', canUpdate: true }]))
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<boolean> {
    return this.commandBus.execute(new DeleteContractCommand(id));
  }
}
