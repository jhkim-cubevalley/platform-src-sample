import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteTosCommand } from '../commands/delete-tos.command';
import { Tos } from '../domain/tos.entity';
import { GetTosQuery } from '../queries/get-tos.query';
import { Error } from '../../../infrastructure/common/error';

@Injectable()
@CommandHandler(DeleteTosCommand)
export class DeleteTosHandler implements ICommandHandler<DeleteTosCommand> {
  constructor(
    @InjectRepository(Tos) private readonly tosRepository: Repository<Tos>,
    private readonly queryBus: QueryBus
  ) {}

  async execute({ id }: DeleteTosCommand): Promise<boolean> {
    const tos = await this.queryBus.execute<unknown, Tos | undefined>(new GetTosQuery(id));
    if (!tos) throw new NotFoundException(Error.NOT_FOUND_TOS);

    if (tos.productTos.length > 0) throw new BadRequestException(Error.MUST_DELETE_PRODUCT_BEFORE);

    await this.tosRepository.delete({
      id
    });
    Logger.log({ message: `약관을 삭제했습니다.`, id });
    return true;
  }
}
