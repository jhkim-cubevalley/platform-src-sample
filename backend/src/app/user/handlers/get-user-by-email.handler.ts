import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { GetUserByEmailQuery } from '../queries/get-user-by-email.query';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler implements IQueryHandler<GetUserByEmailQuery> {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async execute(query: GetUserByEmailQuery): Promise<Exclude<User, 'password'> | undefined> {
    const { email, needPassword } = query;

    const user = await this.userRepository.findOne({
      relations: {
        accountSns: true,
        group: {
          role: {
            rolePolicy: true
          }
        },
        reviews: true
      },
      select: {
        password: !!needPassword,
        uid: true,
        email: true,
        name: true,
        nickname: true,
        sex: true,
        phone: true,
        socialType: true,
        accountSns: true,
        lastLogin: true,
        point: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true
      },
      where: { email },
      withDeleted: true
    });
    if (!user) return undefined;

    if (!needPassword) {
      user.password = '';
      delete user.password;
    }

    return user;
  }
}
