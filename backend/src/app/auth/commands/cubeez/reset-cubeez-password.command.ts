import { ICommand } from '@nestjs/cqrs';

export class ResetCubeezPasswordCommand implements ICommand {
  constructor(
    readonly data: {
      readonly id: string;
      readonly newPassword: string;
    }
  ) {}
}
