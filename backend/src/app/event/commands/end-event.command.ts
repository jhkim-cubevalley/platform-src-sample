import { ICommand } from '@nestjs/cqrs';

export class EndEventCommand implements ICommand {
  constructor(readonly id: number, readonly adminMessage: string) {}
}
