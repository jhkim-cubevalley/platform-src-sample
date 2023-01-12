import { ICommand } from '@nestjs/cqrs';
import GroupType from '../../../../infrastructure/common/types/group-type';

export class SetGroupToAccountCommand implements ICommand {
  constructor(
    readonly data: {
      readonly uid: string;
      readonly groupId: string | null;
      readonly type: GroupType;
    }
  ) {}
}
