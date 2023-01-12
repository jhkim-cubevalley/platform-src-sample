import { ICommand } from '@nestjs/cqrs';
import { SettlementStatus } from '../../event/domain/event.entity';

export class SetCubeezSettlementStatusCommand implements ICommand {
  constructor(
    readonly data: {
      readonly eventId: number;
      readonly status: SettlementStatus;
    }
  ) {}
}
