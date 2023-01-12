import { ICommand } from '@nestjs/cqrs';

export class ForgotAdminPasswordCommand implements ICommand {
  constructor(
    readonly data: {
      readonly email: string;
    }
  ) {}
}
