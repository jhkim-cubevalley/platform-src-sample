import { ICommand } from '@nestjs/cqrs';

export class SetEventTypeCommand implements ICommand {
  constructor(
    readonly data: {
      readonly eventId: number;
      readonly eventTypeId: string;
    }
  ) {}
}
