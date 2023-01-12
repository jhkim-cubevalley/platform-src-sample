import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCubeezByNicknameQuery } from '../queries/get-cubeez-by-nickname.query';
import { Cubeez } from '../domain/cubeez.entity';

@QueryHandler(GetCubeezByNicknameQuery)
export class GetCubeezByNicknameHandler implements IQueryHandler<GetCubeezByNicknameQuery> {
  constructor(@InjectRepository(Cubeez) private readonly cubeezRepository: Repository<Cubeez>) {}

  async execute(query: GetCubeezByNicknameQuery): Promise<Exclude<Cubeez, 'password'> | undefined> {
    const { nickname } = query;

    const cubeez = await this.cubeezRepository.findOne({
      where: { nickname },
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
