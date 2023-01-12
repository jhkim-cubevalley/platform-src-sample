import { ICommand } from '@nestjs/cqrs';

export class FindUserIdCommand implements ICommand {
  constructor(public readonly phone: string, public readonly phoneCode: string) {}
}
