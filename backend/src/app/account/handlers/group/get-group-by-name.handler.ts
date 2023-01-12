import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetGroupByNameQuery } from '../../queries/group/get-group-by-name.query';
import { Group } from '../../domain/group.entity';

@Injectable()
@QueryHandler(GetGroupByNameQuery)
export class GetGroupByNameHandler implements IQueryHandler<GetGroupByNameQuery> {
  constructor(@InjectRepository(Group) private readonly groupRepository: Repository<Group>) {}

  async execute({ name }: GetGroupByNameQuery): Promise<Group | undefined> {
    const result = await this.groupRepository.findOne({
      where: { name },
      relations: {
        user: true,
        cubeez: true,
        admin: true
      }
    });
    if (!result) return undefined;
    return result;
  }
}
