import { ICommand } from '@nestjs/cqrs';
import GroupType from '../../../infrastructure/common/types/group-type';

export class GenerateTokenCommand implements ICommand {
  constructor(
    readonly data: {
      readonly email: string;
      readonly name: string;
      readonly type: GroupType;
    }
  ) {}
}
