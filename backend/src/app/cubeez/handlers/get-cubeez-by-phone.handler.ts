import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCubeezByPhoneQuery } from '../queries/get-cubeez-by-phone.query';
import { Cubeez } from '../domain/cubeez.entity';
import { CubeezPhone } from '../domain/cubeez-phone.entity';

@QueryHandler(GetCubeezByPhoneQuery)
export class GetCubeezByPhoneHandler implements IQueryHandler<GetCubeezByPhoneQuery> {
  constructor(@InjectRepository(CubeezPhone) private readonly cubeezPhoneRepository: Repository<CubeezPhone>) {}

  async execute(query: GetCubeezByPhoneQuery): Promise<Exclude<Cubeez, 'password'> | undefined> {
    const { phone } = query;
    const phoneData = await this.cubeezPhoneRepository.findOne({ where: { phone }, relations: { cubeez: true } });

    if (!phoneData) return undefined;

    const { cubeez } = phoneData;
    delete cubeez.password;

    return cubeez;
  }
}
