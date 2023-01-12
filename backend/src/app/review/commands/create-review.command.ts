import { ICommand } from '@nestjs/cqrs';
import { User } from '../../user/domain/user.entity';

export class CreateReviewCommand implements ICommand {
  constructor(
    readonly data: {
      readonly eventId: number;
      readonly user: User;
      readonly review: string;
      readonly rating: number;
    }
  ) {}
}
