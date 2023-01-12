import { ICommand } from '@nestjs/cqrs';

export class RequestUpdateEventCommand implements ICommand {
  constructor(
    readonly data: {
      readonly id: number;
      readonly editMessage: string;
    }
  ) {}
}
