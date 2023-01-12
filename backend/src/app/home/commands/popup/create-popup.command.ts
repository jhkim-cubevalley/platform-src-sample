import { ICommand } from '@nestjs/cqrs';

export class CreatePopupCommand implements ICommand {
  constructor(
    readonly data: {
      readonly title: string;
      readonly link: string;
      readonly imageUrl?: string;
      readonly useCookie: boolean;
      readonly cookieDay?: number;
      readonly isEnable?: boolean;
    }
  ) {}
}
