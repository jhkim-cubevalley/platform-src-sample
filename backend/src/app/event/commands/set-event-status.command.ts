import { ICommand } from '@nestjs/cqrs';
import { EventStatus } from '../domain/event.entity';

export class SetEventStatusCommand implements ICommand {
  constructor(
    readonly data: {
      readonly eventId: number;
      readonly status: EventStatus;
    }
  ) {}
}
