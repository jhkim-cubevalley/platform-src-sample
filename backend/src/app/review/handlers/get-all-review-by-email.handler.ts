import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetAllReviewByEmailQuery } from '../queries/get-all-review-by-email.query';
import { Review } from '../domain/review.entity';

@Injectable()
@QueryHandler(GetAllReviewByEmailQuery)
export class GetAllReviewByEmailHandler implements IQueryHandler<GetAllReviewByEmailQuery> {
  constructor(@InjectRepository(Review) private readonly repository: Repository<Review>) {}

  async execute({ email }: GetAllReviewByEmailQuery): Promise<Review[]> {
    const result = await this.repository.find({
      where: {
        user: { email }
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
