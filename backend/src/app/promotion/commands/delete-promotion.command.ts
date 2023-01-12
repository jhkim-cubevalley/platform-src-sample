import { ICommand } from '@nestjs/cqrs';

export class DeletePromotionCommand implements ICommand {
  constructor(readonly id: string) {}
}
