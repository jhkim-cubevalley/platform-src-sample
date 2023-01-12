import { ICommand } from '@nestjs/cqrs';

export class WriteFreeBoardCommand implements ICommand {
  constructor(
    readonly data: {
      readonly title: string;
      readonly content: string;
      readonly author: string;
    }
  ) {}
}
