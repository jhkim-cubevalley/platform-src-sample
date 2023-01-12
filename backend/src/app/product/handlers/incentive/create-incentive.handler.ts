import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateIncentiveCommand } from '../../commands/incentive/create-incentive.command';
import { Incentive } from '../../domain/incentive/incentive.entity';
import { GetRegionQuery } from '../../queries/region/get-region.query';
import { Error } from '../../../../infrastructure/common/error';

@Injectable()
@CommandHandler(CreateIncentiveCommand)
export class CreateIncentiveHandler implements ICommandHandler<CreateIncentiveCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectRepository(Incentive) private readonly incentiveRepository: Repository<Incentive>
  ) {}

  async execute({ data }: CreateIncentiveCommand) {
    const { regionId, author, ...input } = data;

    const existsRegion = await this.queryBus.execute(new GetRegionQuery(regionId));
    if (!existsRegion) throw new NotFoundException(Error.NOT_FOUND_REGION);

    const result = this.incentiveRepository.create({
      ...input,
      user: author,
      region: {
        id: regionId
      }
    });
    await this.incentiveRepository.save(result);
    Logger.log({ message: `인센티브 여행을 추가했습니다.`, id: result.id, who: author.uid });
    return result;
  }
}
