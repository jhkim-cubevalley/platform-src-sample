import { ICommand } from '@nestjs/cqrs';

export class FindCubeezIdCommand implements ICommand {
  constructor(
    readonly data: {
      readonly phone: string;
      readonly phoneCode: string;
    }
  ) {}
}
