import { ICommand } from '@nestjs/cqrs';

export class DeleteNoticeCommand implements ICommand {
  constructor(readonly id: number) {}
}
