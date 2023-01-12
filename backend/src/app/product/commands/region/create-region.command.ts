import { ICommand } from '@nestjs/cqrs';

export class CreateRegionCommand implements ICommand {
  constructor(
    readonly data: {
      readonly name: string;
      readonly code: string;
      readonly depth: number;
      readonly priority: number;
      readonly isEnable: boolean;
      readonly parentId?: string;
    }
  ) {}
}
