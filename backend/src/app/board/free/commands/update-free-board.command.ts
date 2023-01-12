import { ICommand } from '@nestjs/cqrs';

export class UpdateFreeBoardCommand implements ICommand {
  constructor(
    readonly id: number,
    readonly data: Partial<{
      readonly title: string;
      readonly content: string;
    }>
  ) {}
}
