import { ICommand } from '@nestjs/cqrs';
import SexType from '../../../../infrastructure/common/types/sex-type';

export class SaveMoreProfileCommand implements ICommand {
  constructor(
    readonly data: {
      readonly id: string;
      readonly nickname: string;
      readonly referralCode?: string;
      readonly sns: Array<{ name: string; handle: string }>;
      readonly sex?: SexType;
      readonly phone?: string;
    }
  ) {}
}
