import { ICommand } from '@nestjs/cqrs';
import GroupType from '../../../infrastructure/common/types/group-type';

export class DeleteLibraryCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly account: {
      readonly email: string;
      readonly type: GroupType;
    }
  ) {}
}
