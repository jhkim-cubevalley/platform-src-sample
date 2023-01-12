import { ICommand } from '@nestjs/cqrs';
import SexType from '../../../infrastructure/common/types/sex-type';
import SocialType from '../../../infrastructure/common/types/social-type';

export class CreateUserCommand implements ICommand {
  constructor(
    readonly email: string,
    readonly password: string | null,
    readonly name: string,
    readonly nickname: string,
    readonly sex: SexType,
    readonly phone: string,
    readonly referralCode: string | null,
    readonly sns: Array<{ name: string; handle: string }>,
    readonly socialType?: SocialType
  ) {}
}
