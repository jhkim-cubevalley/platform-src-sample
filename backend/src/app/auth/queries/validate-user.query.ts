import { IQuery } from '@nestjs/cqrs';

export class ValidateUserQuery implements IQuery {
  constructor(
    readonly data: {
      readonly email: string;
      readonly password: string;
      readonly entity: 'user' | 'cubeez' | 'admin';
    }
  ) {}
}
