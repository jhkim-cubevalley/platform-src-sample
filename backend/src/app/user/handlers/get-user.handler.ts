import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { GetUserQuery } from '../queries/get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async execute(query: GetUserQuery): Promise<Exclude<User, 'password'> | undefined> {
    const { uid } = query;

    const user = await this.userRepository.findOne({
      where: { uid },
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
