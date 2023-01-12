import { ICommand } from '@nestjs/cqrs';
import { PointConfigKey } from '../domain/point-config.entity';

export class SetPointConfigCommand implements ICommand {
  constructor(
    readonly data: {
      key: PointConfigKey;
      value: string;
    }
  ) {}
}
