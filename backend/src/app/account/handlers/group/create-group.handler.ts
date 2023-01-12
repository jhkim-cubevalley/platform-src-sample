import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Error } from '../../../../infrastructure/common/error';
import { CreateGroupCommand } from '../../commands/group/create-group.command';
import { Group } from '../../domain/group.entity';
import { GetGroupByNameQuery } from '../../queries/group/get-group-by-name.query';

@Injectable()
@CommandHandler(CreateGroupCommand)
export class CreateGroupHandler implements ICommandHandler<CreateGroupCommand> {
  constructor(
    @InjectRepository(Group) private readonly groupRepository: Repository<Group>,
    private readonly queryBus: QueryBus
  ) {}

  async execute({ data }: CreateGroupCommand): Promise<Group> {
    const prevByName = await this.queryBus.execute(new GetGroupByNameQuery(data.name));
    if (prevByName) throw new ConflictException(Error.GROUP_ALREADY_EXISTS);

    const result = this.groupRepository.create({
      ...data
    });
    await this.groupRepository.save(result);
    Logger.log({ message: `그룹을 추가했습니다.`, name: result.name, type: result.type });
    return result;
  }
}
