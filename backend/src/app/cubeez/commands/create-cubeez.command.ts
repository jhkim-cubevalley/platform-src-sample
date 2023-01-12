import { ICommand } from '@nestjs/cqrs';

export class CreateCubeezCommand implements ICommand {
  constructor(
    readonly data: {
      readonly email: string;
      readonly password: string;
      readonly name: string;
      readonly nickname: string | null;
      readonly introduce: string;
      readonly phones: string[];
      readonly sns: Array<{ name: string; handle: string }>;
      readonly isBusiness: boolean;
      readonly zipcode: string | null;
      readonly address: string | null;
      readonly addressDetail: string | null;
      readonly businessType: string | null;
      readonly businessName: string | null;
    }
  ) {}
}
