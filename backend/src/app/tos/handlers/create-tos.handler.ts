import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTosCommand } from '../commands/create-tos.command';
import { Tos } from '../domain/tos.entity';
import { GetTosByNameQuery } from '../queries/get-tos-by-name.query';
import { Error } from '../../../infrastructure/common/error';
import { filterHTML } from '../../../infrastructure/common/util';

@Injectable()
@CommandHandler(CreateTosCommand)
export class CreateTosHandler implements ICommandHandler<CreateTosCommand> {
  constructor(
    @InjectRepository(Tos) private readonly tosRepository: Repository<Tos>,
    private readonly queryBus: QueryBus
  ) {}

  async execute({ data }: CreateTosCommand): Promise<Tos> {
    const exists = await this.queryBus.execute(new GetTosByNameQuery(data.name));
    if (exists) throw new ConflictException(Error.TOS_ALREADY_EXISTS);
    const clearContent = filterHTML(data.content);
    const result = this.tosRepository.create({
      ...data,
      content: clearContent
    });
    await this.tosRepository.save(result);
    Logger.log({ message: `약관을 추가했습니다.`, id: result.id });
    return result;
  }
}
