import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Incentive } from '../../domain/incentive/incentive.entity';
import { Error } from '../../../../infrastructure/common/error';
import { AddIncentiveAnswerCommand } from '../../commands/incentive/add-incentive-answer.command';

@Injectable()
@CommandHandler(AddIncentiveAnswerCommand)
export class AddIncentiveAnswerHandler implements ICommandHandler<AddIncentiveAnswerCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectRepository(Incentive) private readonly incentiveRepository: Repository<Incentive>
  ) {}

  async execute({ id, answer }: AddIncentiveAnswerCommand): Promise<boolean> {
    const { affected } = await this.incentiveRepository.update(
      { id },
      {
        answer
      }
    );
    if (affected <= 0) throw new NotFoundException(Error.NOT_FOUND_INCENTIVE);
    Logger.log({ message: `인센티브 여행 답변을 추가했습니다.`, id });
    return true;
  }
}
