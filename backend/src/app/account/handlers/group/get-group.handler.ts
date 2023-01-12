import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetGroupQuery } from '../../queries/group/get-group.query';
import { Group } from '../../domain/group.entity';

@Injectable()
@QueryHandler(GetGroupQuery)
export class GetGroupHandler implements IQueryHandler<GetGroupQuery> {
  constructor(@InjectRepository(Group) private readonly groupRepository: Repository<Group>) {}

  async execute({ id }: GetGroupQuery): Promise<Group | undefined> {
    const group = await this.groupRepository.findOne({
      where: {
        id
      },
      relations: {
        user: true,
        cubeez: true,
        admin: true
      }
    });
    if (!group) return undefined;
    return group;
  }
}
