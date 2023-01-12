import { ICommand } from '@nestjs/cqrs';

export class IncreaseFreeBoardViewcountCommand implements ICommand {
  constructor(readonly id: number) {}
}
