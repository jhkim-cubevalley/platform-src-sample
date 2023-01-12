import { ICommand } from '@nestjs/cqrs';
import RolePolicyCode from '../../../../infrastructure/common/types/role-policy-code';

export class AddRoleCommand implements ICommand {
  constructor(
    readonly data: {
      readonly name: string;
      readonly groupId?: string;
      readonly policies: {
        readonly code: RolePolicyCode;
        readonly canAccess: boolean;
        readonly canUpdate: boolean;
        readonly canApprove: boolean;
      }[];
    }
  ) {}
}
