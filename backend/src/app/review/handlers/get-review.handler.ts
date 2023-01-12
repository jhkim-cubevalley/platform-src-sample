import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetReviewQuery } from '../queries/get-review.query';
import { Review } from '../domain/review.entity';

@Injectable()
@QueryHandler(GetReviewQuery)
export class GetReviewHandler implements IQueryHandler<GetReviewQuery> {
  constructor(@InjectRepository(Review) private readonly repository: Repository<Review>) {}

  async execute({ id }: GetReviewQuery): Promise<Review | undefined> {
    const result = await this.repository.findOne({
      where: {
        id
      },
      relations: {
        event: {
          product: {
            cubeez: true
          }
        },
        user: true,
        cubeez: true,
        files: true
      }
    });
    if (!result) return undefined;
    return result;
  }
}
