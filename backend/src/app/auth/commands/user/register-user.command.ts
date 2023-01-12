import { ICommand } from '@nestjs/cqrs';
import SexType from '../../../../infrastructure/common/types/sex-type';

export class RegisterUserCommand implements ICommand {
  constructor(
    readonly email: string,
    readonly password: string,
    readonly name: string,
    readonly nickname: string,
    readonly sex: SexType,
    readonly phone: string,
    readonly referralCode: string,
    readonly sns: Array<{ name: string; handle: string }>,
    readonly emailCode: string,
    readonly phoneCode: string
  ) {}
}
