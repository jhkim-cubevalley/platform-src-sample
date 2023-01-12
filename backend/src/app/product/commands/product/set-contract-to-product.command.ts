import { ICommand } from '@nestjs/cqrs';

export class SetContractToProductCommand implements ICommand {
  constructor(readonly productId: number, readonly contractId: number) {}
}
