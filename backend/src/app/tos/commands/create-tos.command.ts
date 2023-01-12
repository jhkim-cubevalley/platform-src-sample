import { ICommand } from '@nestjs/cqrs';
import { TosType } from '../domain/tos.entity';

export class CreateTosCommand implements ICommand {
  constructor(
    readonly data: {
      readonly name: string;
      readonly type: TosType;
      readonly content: string;
      readonly isEnable: boolean;
    }
  ) {}
}
