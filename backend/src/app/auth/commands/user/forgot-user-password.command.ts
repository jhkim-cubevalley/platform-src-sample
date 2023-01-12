import { ICommand } from '@nestjs/cqrs';

export class ForgotUserPasswordCommand implements ICommand {
  constructor(readonly email: string) {}
}
