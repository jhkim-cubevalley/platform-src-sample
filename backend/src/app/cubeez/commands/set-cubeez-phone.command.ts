import { ICommand } from '@nestjs/cqrs';

export class SetCubeezPhoneCommand implements ICommand {
  constructor(
    readonly data: {
      readonly cubeez: string;
      readonly phones: string[];
    }
  ) {}
}
