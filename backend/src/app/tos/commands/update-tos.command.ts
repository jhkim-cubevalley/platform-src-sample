import { ICommand } from '@nestjs/cqrs';

export class UpdateTosCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly data: {
      readonly name: string;
      readonly content: string;
      readonly isEnable: boolean;
    }
  ) {}
}
