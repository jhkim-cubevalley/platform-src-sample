import { ICommand } from '@nestjs/cqrs';

export class DeleteFreeBoardReplyCommand implements ICommand {
  constructor(readonly id: number) {}
}
