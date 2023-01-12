import { ICommand } from '@nestjs/cqrs';

export class DecodeTokenCommand implements ICommand {
  constructor(readonly token: string, readonly isRefresh?: boolean) {}
}
