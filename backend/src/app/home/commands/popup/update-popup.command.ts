import { ICommand } from '@nestjs/cqrs';

export class UpdatePopupCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly data: Partial<{
      readonly title: string;
      readonly link: string;
      readonly imageUrl: string;
      readonly useCookie: boolean;
      readonly cookieDay: number;
      readonly isEnable: boolean;
    }>
  ) {}
}
