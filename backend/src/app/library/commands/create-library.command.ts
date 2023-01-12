import { ICommand } from '@nestjs/cqrs';
import { Admin } from '../../admin/domain/admin.entity';
import { Cubeez } from '../../cubeez/domain/cubeez.entity';

export class CreateLibraryCommand implements ICommand {
  constructor(
    readonly data: {
      readonly name: string;
      readonly originalName: string;
      readonly isUse: boolean;
      readonly continent: string;
      readonly country: string;
      readonly city: string;
      readonly description: string;
      readonly category: string;
      readonly isPrivate: boolean;
      readonly status: 'temp' | 'post';
      readonly detail: Record<string, string>;
      readonly author: Cubeez | Admin;
    }
  ) {}
}
