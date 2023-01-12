import { ICommand } from '@nestjs/cqrs';

export class DoneUpdateEventCommand implements ICommand {
  constructor(readonly id: number, readonly message: string) {}
}
