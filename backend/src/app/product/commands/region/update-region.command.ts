import { ICommand } from '@nestjs/cqrs';

export class UpdateRegionCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly data: {
      readonly name: string;
      readonly code: string;
      readonly priority: number;
      readonly isEnable: boolean;
    }
  ) {}
}
