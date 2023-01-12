import { ICommand } from '@nestjs/cqrs';

export class DenyUpdateEventCommand implements ICommand {
  constructor(readonly id: number, readonly message: string) {}
}
