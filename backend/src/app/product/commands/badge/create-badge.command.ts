import { ICommand } from '@nestjs/cqrs';

export class CreateBadgeCommand implements ICommand {
  constructor(
    readonly data: {
      readonly name: string;
      readonly type: string;
      readonly productId: number;
      readonly regionOneId: string;
      readonly regionTwoId: string;
      readonly regionThreeId: string;
    }
  ) {}
}
