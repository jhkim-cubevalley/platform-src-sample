import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { DeletePromotionCommand } from '../commands/delete-promotion.command';
import { Promotion } from '../domain/promotion.entity';
import { GetPromotionQuery } from '../queries/get-promotion.query';
import { Error } from '../../../infrastructure/common/error';

@Injectable()
@CommandHandler(DeletePromotionCommand)
export class DeletePromotionHandler implements ICommandHandler<DeletePromotionCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectRepository(Promotion) private readonly repository: Repository<Promotion>
  ) {}

  async execute({ id }: DeletePromotionCommand): Promise<boolean> {
    try {
      const promotion = await this.queryBus.execute<unknown, Promotion>(new GetPromotionQuery(id));
      if (!promotion) throw new NotFoundException(Error.NOT_FOUND_PROMOTION);
      await this.repository.delete({ id });
      Logger.log({ message: '프로모션을 삭제했습니다.', id, type: promotion.type });
      return true;
    } catch (e) {
      if (e instanceof QueryFailedError) throw new ConflictException(Error.CAN_NOT_DELETE_BECAUSE_OF_RELATION);
      else throw e;
    }
  }
}
