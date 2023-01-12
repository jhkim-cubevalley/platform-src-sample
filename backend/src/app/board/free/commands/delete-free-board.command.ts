import { ICommand } from '@nestjs/cqrs';

export class DeleteFreeBoardCommand implements ICommand {
  constructor(readonly id: number) {}
}
