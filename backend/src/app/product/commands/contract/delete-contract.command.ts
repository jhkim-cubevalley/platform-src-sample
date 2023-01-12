import { ICommand } from '@nestjs/cqrs';

export class DeleteContractCommand implements ICommand {
  constructor(readonly id: number) {}
}
