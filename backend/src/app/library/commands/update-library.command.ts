import { ICommand } from '@nestjs/cqrs';
import { DeepPartial } from 'typeorm';
import { Library } from '../domain/library.entity';
import GroupType from '../../../infrastructure/common/types/group-type';

export class UpdateLibraryCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly data: DeepPartial<Library>,
    readonly detail: Record<string, string>,
    readonly account: {
      readonly email: string;
      readonly type: GroupType;
    }
  ) {}
}
