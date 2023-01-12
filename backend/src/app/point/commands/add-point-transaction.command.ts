import { ICommand } from '@nestjs/cqrs';
import { EntityManager } from 'typeorm';

export class AddPointTransactionCommand implements ICommand {
  constructor(
    readonly data: {
      readonly userUid: string;
      readonly value: number;
      readonly cause: string;
      readonly dbTransaction?: EntityManager;
    }
  ) {}
}
