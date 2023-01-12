import { IQuery } from '@nestjs/cqrs';

export class GetAllInquiryQuery implements IQuery {
  constructor(
    readonly data: {
      readonly offset?: number;
      readonly limit?: number;
      readonly filters?: Partial<{
        readonly status: 'notanswer' | 'answered' | 'closed';
        readonly cubeezEmail: string;
        readonly managerEmail: string;
        readonly createdAt: Date;
        readonly title: string;
        readonly content: string;
      }>;
    }
  ) {}
}
