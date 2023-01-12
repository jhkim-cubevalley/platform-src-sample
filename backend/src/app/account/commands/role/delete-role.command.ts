import { ICommand } from '@nestjs/cqrs';

export class DeleteRoleCommand implements ICommand {
  constructor(readonly id: number) {}
}
