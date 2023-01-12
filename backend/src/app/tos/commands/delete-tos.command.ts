import { ICommand } from '@nestjs/cqrs';

export class DeleteTosCommand implements ICommand {
  constructor(readonly id: string) {}
}
