import { ICommand } from '@nestjs/cqrs';
import BusinessType from '../../../../infrastructure/common/types/business-type';

export class RegisterCubeezCommand implements ICommand {
  constructor(
    readonly data: {
      readonly email: string;
      readonly name: string;
      readonly password: string;
      readonly nickname?: string;
      readonly phones: string[];
      readonly sns: Array<{ name: string; handle: string }>;
      readonly introduce: string;
      readonly isBusiness: boolean;
      readonly zipcode?: string;
      readonly address?: string;
      readonly addressDetail?: string;
      readonly businessType?: BusinessType;
      readonly businessName?: string;
      readonly emailCode: string;
      readonly phoneCodes: string[];
    }
  ) {}
}
