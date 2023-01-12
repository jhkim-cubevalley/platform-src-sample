import { IQuery } from '@nestjs/cqrs';

export class GetCubeezByEmailQuery implements IQuery {
  constructor(readonly email: string, readonly needPassword?: boolean) {}
}
