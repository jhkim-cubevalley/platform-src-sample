import { ICommand } from '@nestjs/cqrs';
import GroupType from '../../../../infrastructure/common/types/group-type';

export class CreateGroupCommand implements ICommand {
  constructor(
    readonly data: {
      readonly name: string;
      readonly type: GroupType;
      readonly description: string;
      readonly commissionMultiple?: number;
      readonly pointMultiple?: number;
    }
  ) {}
}
