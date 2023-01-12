import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Error } from '../../../../infrastructure/common/error';
import { IncreaseFreeBoardViewcountCommand } from '../commands/increase-free-board-viewcount.command';
import { FreeBoardViewcount } from '../domain/free-board-viewcount.entity';
import { GetFreeBoardQuery } from '../queries/get-free-board.query';

@Injectable()
@CommandHandler(IncreaseFreeBoardViewcountCommand)
export class IncreaseFreeBoardViewcountHandler implements ICommandHandler<IncreaseFreeBoardViewcountCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectRepository(FreeBoardViewcount) private readonly repository: Repository<FreeBoardViewcount>
  ) {}

  async execute({ id }: IncreaseFreeBoardViewcountCommand): Promise<boolean> {
    const existsFreeBoard = await this.queryBus.execute(new GetFreeBoardQuery(id));
    if (!existsFreeBoard) throw new NotFoundException(Error.NOT_FOUND_FREE_BOARD);

    const prev = await this.repository.findOne({
      where: {
        freeBoard: { id }
      }
    });
    if (prev) {
      await this.repository.increment({ freeBoard: { id } }, 'view', 1);
    } else {
      const entity = this.repository.create({
        freeBoard: { id },
        view: 1
      });
      await this.repository.save(entity);
    }

    return true;
  }
}
