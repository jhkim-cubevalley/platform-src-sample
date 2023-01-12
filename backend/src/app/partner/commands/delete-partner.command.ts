import { ICommand } from '@nestjs/cqrs';

export class DeletePartnerCommand implements ICommand {
  constructor(readonly id: string) {}
}
