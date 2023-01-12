import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { GetUserByNicknameQuery } from '../queries/get-user-by-nickname.query';

@QueryHandler(GetUserByNicknameQuery)
export class GetUserByNicknameHandler implements IQueryHandler<GetUserByNicknameQuery> {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async execute(query: GetUserByNicknameQuery): Promise<Exclude<User, 'password'> | undefined> {
    const { nickname } = query;

    const user = await this.userRepository.findOne({
      where: { nickname },
      relations: {
        accountSns: true,
        group: {
          role: {
            rolePolicy: true
          }
        },
        reviews: true
      },
      withDeleted: true
    });
    if (!user) return undefined;

    user.password = '';
    delete user.password;

    return user;
  }
}
