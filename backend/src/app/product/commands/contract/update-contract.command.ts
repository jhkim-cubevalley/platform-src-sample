import { ICommand } from '@nestjs/cqrs';

export class UpdateContractCommand implements ICommand {
  constructor(
    readonly id: number,
    readonly data: Partial<{
      readonly name: string;
      readonly header?: string;
      readonly tos: string[];
      readonly isBusins: boolean;
      readonly businsPrice: number;
      readonly businsDateFrom: Date;
      readonly businsDateTo: Date;
      readonly require: string;
      readonly select: string;
      readonly tripLeader: string;
      readonly guide: string;
      readonly traffic: string;
      readonly isCompany: boolean;
      readonly isFree: boolean;
      readonly info: string;
      readonly refund: string;
      readonly status: 'temp' | 'post';
    }>
  ) {}
}
