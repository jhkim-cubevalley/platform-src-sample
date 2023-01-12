import { ICommand } from '@nestjs/cqrs';

export class AddIncentiveAnswerCommand implements ICommand {
  constructor(readonly id: number, readonly answer: string) {}
}
