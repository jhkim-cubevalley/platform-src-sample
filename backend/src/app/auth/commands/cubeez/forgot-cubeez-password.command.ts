import { ICommand } from '@nestjs/cqrs';

export class ForgotCubeezPasswordCommand implements ICommand {
  constructor(
    readonly data: {
      readonly email: string;
    }
  ) {}
}
