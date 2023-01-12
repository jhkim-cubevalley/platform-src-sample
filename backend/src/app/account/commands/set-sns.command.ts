import { ICommand } from '@nestjs/cqrs';

export class SetSnsCommand implements ICommand {
  constructor(
    readonly data: {
      readonly user: string | null;
      readonly cubeez: string | null;
      readonly sns: Array<{
        readonly name: string;
        readonly handle: string;
      }>;
    }
  ) {}
}
