import { BadRequestException, ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { compare } from 'bcrypt';
import { ValidateUserQuery } from '../queries/validate-user.query';
import { GetUserByEmailQuery } from '../../user/queries/get-user-by-email.query';
import { Error } from '../../../infrastructure/common/error';
import { User } from '../../user/domain/user.entity';
import { Cubeez } from '../../cubeez/domain/cubeez.entity';
import { GetCubeezByEmailQuery } from '../../cubeez/queries/get-cubeez-by-email.query';
import { Admin } from '../../admin/domain/admin.entity';
import { GetAdminByEmailQuery } from '../../admin/queries/get-admin-by-email.query';

@Injectable()
@QueryHandler(ValidateUserQuery)
export class ValidateUserHandler implements IQueryHandler<ValidateUserQuery> {
  constructor(private readonly queryBus: QueryBus) {}

  async execute({ data: { password, email, entity } }: ValidateUserQuery): Promise<User | Cubeez | Admin | undefined> {
    let accountEntity;
    if (entity === 'user') {
      accountEntity = await this.queryBus.execute(new GetUserByEmailQuery(email, true));
    }
    if (entity === 'cubeez') {
      accountEntity = await this.queryBus.execute(new GetCubeezByEmailQuery(email, true));
    }
    if (entity === 'admin') {
      accountEntity = await this.queryBus.execute(new GetAdminByEmailQuery(email, true));
    }

    if (accountEntity === undefined) return undefined;
    if (!accountEntity.password) throw new BadRequestException(Error.NOT_USE_SOCIAL);
    const isMatchPassword = await compare(password, accountEntity.password);
    Logger.log({ message: `계정 비밀번호 일치여부를 확인했습니다.`, email, type: entity });
    if (!isMatchPassword) {
      Logger.warn({ message: `계정 비밀번호가 일치하지 않습니다.`, email, type: entity });
      throw new ForbiddenException(Error.NO_MATCH_PASSWORD);
    }
    return isMatchPassword ? accountEntity : undefined;
  }
}
