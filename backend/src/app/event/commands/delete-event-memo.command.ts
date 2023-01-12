import { ICommand } from '@nestjs/cqrs';

export class DeleteEventMemoCommand implements ICommand {
  constructor(readonly id: string, readonly email: string) {}
}
