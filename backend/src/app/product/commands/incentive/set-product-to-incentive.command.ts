import { ICommand } from '@nestjs/cqrs';

export class SetProductToIncentiveCommand implements ICommand {
  constructor(readonly id: number, readonly productId: number) {}
}
