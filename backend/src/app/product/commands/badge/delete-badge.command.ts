import { ICommand } from '@nestjs/cqrs';

export class DeleteBadgeCommand implements ICommand {
  constructor(readonly id: string) {}
}
