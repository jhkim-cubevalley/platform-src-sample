import { ICommand } from '@nestjs/cqrs';

export class DeletePartnerGroupCommand implements ICommand {
  constructor(readonly id: string) {}
}
