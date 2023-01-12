import { ICommand } from '@nestjs/cqrs';

export class UpdateFreeBoardReplyCommand implements ICommand {
  constructor(
    readonly id: number,
    readonly data: {
      readonly reply: string;
    }
  ) {}
}
