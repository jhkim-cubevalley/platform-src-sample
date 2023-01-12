import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetAllReviewByEventQuery } from '../queries/get-all-review-by-event.query';
import { Review } from '../domain/review.entity';

@Injectable()
@QueryHandler(GetAllReviewByEventQuery)
export class GetAllReviewByEventHandler implements IQueryHandler<GetAllReviewByEventQuery> {
  constructor(@InjectRepository(Review) private readonly repository: Repository<Review>) {}

  async execute({ eventId }: GetAllReviewByEventQuery): Promise<Review[]> {
    const result = await this.repository.find({
      where: {
        event: { id: eventId }
      },
      order: {
        createdAt: 'desc'
      },
      relations: {
        event: {
          product: {
            cubeez: true
          }
        },
        cubeez: true,
        user: true,
        files: true
      }
    });
    return result;
  }
}
