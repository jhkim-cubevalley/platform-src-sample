import { ICommand } from '@nestjs/cqrs';
import type { Express } from 'express';
import { Review } from '../domain/review.entity';

export class AddReviewFileCommand implements ICommand {
  constructor(
    readonly data: {
      readonly review: Review;
      readonly file: Express.Multer.File;
    }
  ) {}
}
