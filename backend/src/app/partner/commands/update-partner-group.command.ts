import { ICommand } from '@nestjs/cqrs';

export class UpdatePartnerGroupCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly data: Partial<{
      readonly name: string;
      readonly commission: number;
      readonly description: string;
    }>
  ) {}
}
