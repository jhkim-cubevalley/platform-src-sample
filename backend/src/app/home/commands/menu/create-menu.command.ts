import { ICommand } from '@nestjs/cqrs';

export class CreateMenuCommand implements ICommand {
  constructor(
    readonly data: {
      readonly nameKo: string;
      readonly nameEn: string;
      readonly code: string;
      readonly depth: number;
      readonly priority: number;
      readonly isEnable: boolean;
      readonly parentId?: string;
    }
  ) {}
}
