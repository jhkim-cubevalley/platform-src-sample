import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Incentive } from '../../domain/incentive/incentive.entity';
import { Error } from '../../../../infrastructure/common/error';
import { SetIncentiveManagerCommand } from '../../commands/incentive/set-incentive-manager.command';
import { GetAdminQuery } from '../../../admin/queries/get-admin.query';

@Injectable()
@CommandHandler(SetIncentiveManagerCommand)
export class SetIncentiveManagerHandler implements ICommandHandler<SetIncentiveManagerCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectRepository(Incentive) private readonly incentiveRepository: Repository<Incentive>
  ) {}

  async execute({ id, managerId }: SetIncentiveManagerCommand): Promise<boolean> {
    const existsAdmin = await this.queryBus.execute(new GetAdminQuery(managerId));
    if (!existsAdmin) throw new NotFoundException(Error.NOT_FOUND_ADMIN);

    const { affected } = await this.incentiveRepository.update(
      { id },
      {
        manager: {
          uid: managerId
        }
      }
    );
    if (affected <= 0) throw new NotFoundException(Error.NOT_FOUND_INCENTIVE);
    Logger.log({ message: `인센티브 여행에 담당자를 설정했습니다.`, id, managerId });
    return true;
  }
}
