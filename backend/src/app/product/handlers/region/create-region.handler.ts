import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRegionCommand } from '../../commands/region/create-region.command';
import { Region } from '../../domain/region/region.entity';
import { GetRegionByNameQuery } from '../../queries/region/get-region-by-name.query';
import { Error } from '../../../../infrastructure/common/error';
import { GetRegionByCodeQuery } from '../../queries/region/get-region-by-code.query';
import { GetRegionQuery } from '../../queries/region/get-region.query';
import { reorderPriority } from '../../../../infrastructure/common/util';

@Injectable()
@CommandHandler(CreateRegionCommand)
export class CreateRegionHandler implements ICommandHandler<CreateRegionCommand> {
  constructor(
    @InjectRepository(Region) private readonly regionRepository: Repository<Region>,
    private readonly queryBus: QueryBus
  ) {}

  async execute({ data }: CreateRegionCommand): Promise<Region> {
    const { parentId, ...input } = data;

    const prevRegionByName = await this.queryBus.execute(new GetRegionByNameQuery(data.name));
    const prevRegionByCode = await this.queryBus.execute(new GetRegionByCodeQuery(data.code));
    if (prevRegionByName) throw new ConflictException(Error.REGION_ALREADY_EXISTS);
    if (prevRegionByCode) throw new ConflictException(Error.REGION_ALREADY_EXISTS);
    if (parentId) {
      const parent = await this.queryBus.execute(new GetRegionQuery(parentId));
      if (!parent) throw new NotFoundException(Error.NOT_FOUND_REGION);
    }

    await reorderPriority(this.regionRepository, data.priority, parentId, data.depth);

    const result = this.regionRepository.create({
      ...input,
      parent: parentId ? { id: parentId } : null
    });
    await this.regionRepository.save(result);
    Logger.log({ message: `지역을 추가했습니다.`, id: result.id });
    return result;
  }
}
