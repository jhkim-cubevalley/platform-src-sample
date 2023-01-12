import { ICommand } from '@nestjs/cqrs';

export class WriteFreeBoardReplyCommand implements ICommand {
  constructor(
    readonly data: {
      readonly reply: string;
      readonly author: string;
      readonly boardId: number;
      readonly parentId?: number;
    }
  ) {}
}
