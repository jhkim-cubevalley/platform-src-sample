import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Review } from './domain/review.entity';
import { ReviewFile } from './domain/review-file.entity';
import { GetAllReviewByEmailHandler } from './handlers/get-all-review-by-email.handler';
import { GetAllReviewByEventHandler } from './handlers/get-all-review-by-event.handler';
import { GetAllReviewWithEventHandler } from './handlers/get-all-review-with-event.handler';
import { GetReviewHandler } from './handlers/get-review.handler';
import { CreateReviewHandler } from './handlers/create-review.handler';
import { AddReviewFileHandler } from './handlers/add-review-file.handler';
import { UpsertReviewAnswerHandler } from './handlers/upsert-review-answer.handler';
import { DeleteReviewAnswerHandler } from './handlers/delete-review-answer.handler';
import { ReservationPeople } from '../reservation/domain/reservation-people.entity';
import { ReviewController } from './review.controller';
import { SendRequestAnswerHandler } from './handlers/send-request-answer.handler';

const reviewHandlers = [
  GetAllReviewByEmailHandler,
  GetAllReviewByEventHandler,
  GetAllReviewWithEventHandler,
  GetReviewHandler,
  CreateReviewHandler,
  AddReviewFileHandler,
  UpsertReviewAnswerHandler,
  DeleteReviewAnswerHandler,
  SendRequestAnswerHandler
];

@Module({
  imports: [TypeOrmModule.forFeature([Review, ReviewFile, ReservationPeople]), CqrsModule],
  providers: [...reviewHandlers],
  controllers: [ReviewController]
})
export class ReviewModule {}
