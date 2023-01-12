import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateRegionCommand } from '../../commands/region/update-region.command';
import { Region } from '../../domain/region/region.entity';
import { Error } from '../../../../infrastructure/common/error';
import { GetRegionByNameQuery } from '../../queries/region/get-region-by-name.query';
import { GetRegionByCodeQuery } from '../../queries/region/get-region-by-code.query';
import { reorderPriority } from '../../../../infrastructure/common/util';
import { GetRegionQuery } from '../../queries/region/get-region.query';

@Injectable()
@CommandHandler(UpdateRegionCommand)
export class UpdateRegionHandler implements ICommandHandler<UpdateRegionCommand> {
  constructor(
    @InjectRepository(Region) private readonly regionRepository: Repository<Region>,
    private readonly queryBus: QueryBus
  ) {}

  async execute({ id, data }: UpdateRegionCommand): Promise<boolean> {
    const region = await this.queryBus.execute<unknown, Region | undefined>(new GetRegionQuery(id));
    if (!region) throw new NotFoundException(Error.NOT_FOUND_REGION);

    const prevRegionByName = await this.queryBus.execute(new GetRegionByNameQuery(data.name));
    const prevRegionByCode = await this.queryBus.execute(new GetRegionByCodeQuery(data.code));
    if (prevRegionByName && prevRegionByName.id !== id) throw new ConflictException(Error.REGION_ALREADY_EXISTS);
    if (prevRegionByCode && prevRegionByCode.id !== id) throw new ConflictException(Error.REGION_ALREADY_EXISTS);

    if (region.priority !== data.priority) {
      await reorderPriority(this.regionRepository, data.priority, region.parent.id, region.depth);
    }
    await this.regionRepository.update({ id }, { ...data });
    Logger.log({ message: `지역을 수정했습니다.`, id });
    return true;
  }
}
