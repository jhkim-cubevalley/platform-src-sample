import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCubeezQuery } from '../queries/get-cubeez.query';
import { Cubeez } from '../domain/cubeez.entity';

@QueryHandler(GetCubeezQuery)
export class GetCubeezHandler implements IQueryHandler<GetCubeezQuery> {
  constructor(@InjectRepository(Cubeez) private readonly cubeezRepository: Repository<Cubeez>) {}

  async execute(query: GetCubeezQuery): Promise<Exclude<Cubeez, 'password'> | undefined> {
    const { uid } = query;

    const cubeez = await this.cubeezRepository.findOne({
      where: { uid },
      relations: {
        accountSns: true,
        cubeezPhone: true,
        group: {
          role: {
            rolePolicy: true
          }
        },
        manageGroup: true,
        reviews: true
      },
      withDeleted: true
    });
    if (!cubeez) return undefined;

    delete cubeez.password;

    return cubeez;
  }
}
