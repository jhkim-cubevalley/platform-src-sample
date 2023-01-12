import { ICommand } from '@nestjs/cqrs';
import GroupType from '../../../infrastructure/common/types/group-type';
import NotificationType from '../../../infrastructure/common/types/notification-type';
import RolePolicyCode from '../../../infrastructure/common/types/role-policy-code';

export class SendNotificationCommand implements ICommand {
  constructor(
    readonly target: GroupType,
    readonly data: {
      readonly type: NotificationType;
      readonly payload: unknown;
    },
    readonly email?: string,
    readonly role?: {
      code: RolePolicyCode;
      canAccess?: boolean;
      canUpdate?: boolean;
      canApprove?: boolean;
    }
  ) {}
}
