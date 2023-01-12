import { ICommand } from '@nestjs/cqrs';

export class RequestEndEventCommand implements ICommand {
  constructor(readonly id: number) {}
}
