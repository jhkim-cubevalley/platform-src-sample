import { ICommand } from '@nestjs/cqrs';

export class SendPhoneCodeCommand implements ICommand {
  constructor(readonly phone: string) {}
}
