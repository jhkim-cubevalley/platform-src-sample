import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateGroupCommand } from '../../commands/group/update-group.command';
import { Group } from '../../domain/group.entity';
import { Error } from '../../../../infrastructure/common/error';
import { GetGroupByNameQuery } from '../../queries/group/get-group-by-name.query';

@Injectable()
@CommandHandler(UpdateGroupCommand)
export class UpdateGroupHandler implements ICommandHandler<UpdateGroupCommand> {
  constructor(
    @InjectRepository(Group) private readonly groupRepository: Repository<Group>,
    private readonly queryBus: QueryBus
  ) {}

  async execute({ id, data }: UpdateGroupCommand): Promise<boolean> {
    const prevByName = await this.queryBus.execute(new GetGroupByNameQuery(data.name));
    if (prevByName && prevByName.id !== id) throw new ConflictException(Error.GROUP_ALREADY_EXISTS);

    const { affected } = await this.groupRepository.update({ id }, data);
    if (affected <= 0) throw new NotFoundException(Error.NOT_FOUND_GROUP);
    Logger.log({ message: `그룹을 수정했습니다.`, id });
    return true;
  }
}
