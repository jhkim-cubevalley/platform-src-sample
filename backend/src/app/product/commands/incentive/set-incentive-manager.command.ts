import { ICommand } from '@nestjs/cqrs';

export class SetIncentiveManagerCommand implements ICommand {
  constructor(readonly id: number, readonly managerId: string) {}
}
