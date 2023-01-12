import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { GetUserByPhoneQuery } from '../queries/get-user-by-phone.query';

@QueryHandler(GetUserByPhoneQuery)
export class GetUserByPhoneHandler implements IQueryHandler<GetUserByPhoneQuery> {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async execute(query: GetUserByPhoneQuery): Promise<Exclude<User, 'password'> | undefined> {
    const { phone } = query;

    const user = await this.userRepository.findOne({
      where: { phone },
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
