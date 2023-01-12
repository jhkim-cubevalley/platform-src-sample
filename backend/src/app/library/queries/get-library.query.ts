import { IQuery } from '@nestjs/cqrs';

export class GetLibraryQuery implements IQuery {
  constructor(readonly id: string) {}
}
