import { ICommand } from '@nestjs/cqrs';

export class ResetUserPasswordCommand implements ICommand {
  constructor(readonly id: string, readonly newPassword: string) {}
}
