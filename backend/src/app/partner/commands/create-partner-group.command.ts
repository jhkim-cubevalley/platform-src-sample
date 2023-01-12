import { ICommand } from '@nestjs/cqrs';

export class CreatePartnerGroupCommand implements ICommand {
  constructor(
    readonly data: {
      readonly name: string;
      readonly commission: number;
      readonly description: string;
    }
  ) {}
}
