import { ICommand } from '@nestjs/cqrs';

export class UpdateMenuCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly data: {
      readonly nameKo: string;
      readonly nameEn: string;
      readonly code: string;
      readonly priority: number;
      readonly isEnable: boolean;
    }
  ) {}
}
