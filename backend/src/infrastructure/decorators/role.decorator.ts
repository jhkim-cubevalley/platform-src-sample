import { SetMetadata } from '@nestjs/common';
import RolePolicyCode from '../common/types/role-policy-code';

interface Role {
  readonly roleCode: RolePolicyCode;
  readonly canAccess?: boolean;
  readonly canUpdate?: boolean;
  readonly canApprove?: boolean;
}

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
