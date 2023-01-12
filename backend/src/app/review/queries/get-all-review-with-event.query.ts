import { IQuery } from '@nestjs/cqrs';

export class GetAllReviewWithEventQuery implements IQuery {
  constructor(
    readonly data: {
      readonly offset?: number;
      readonly limit?: number;
      readonly cubeezEmail?: string;
      readonly filters?: Partial<{
        readonly type: 'product' | 'cubeez_name' | 'business_name' | 'code';
        readonly search: string;
      }>;
    }
  ) {}
}
