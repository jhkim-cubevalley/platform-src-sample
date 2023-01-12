import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServerConfig } from '../domain/server-config.entity';
import { GetServerConfigQuery } from '../queries/get-server-config.query';
import { DEFAULT_SERVER_CONFIG_VALUE } from '../constants/default-server-config-value.type';
import { Error } from '../../../infrastructure/common/error';

@Injectable()
@QueryHandler(GetServerConfigQuery)
export class GetServerConfigHandler implements IQueryHandler<GetServerConfigQuery> {
  constructor(@InjectRepository(ServerConfig) private readonly repository: Repository<ServerConfig>) {}

  async execute({ key }: GetServerConfigQuery): Promise<string> {
    const serverConfig = await this.repository.findOneBy({ key });
    if (DEFAULT_SERVER_CONFIG_VALUE[key] === undefined) {
      throw new NotFoundException(Error.NOT_FOUND_SERVER_CONFIG_KEY);
    }
    return serverConfig?.value ?? DEFAULT_SERVER_CONFIG_VALUE[key];
  }
}
