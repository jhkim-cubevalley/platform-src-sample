import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpsertReviewAnswerCommand } from '../commands/upsert-review-answer.command';
import { Review } from '../domain/review.entity';
import { GetReviewQuery } from '../queries/get-review.query';
import { Error } from '../../../infrastructure/common/error';
import { GetCubeezQuery } from '../../cubeez/queries/get-cubeez.query';
import { Cubeez } from '../../cubeez/domain/cubeez.entity';

@Injectable()
@CommandHandler(UpsertReviewAnswerCommand)
export class UpsertReviewAnswerHandler implements ICommandHandler<UpsertReviewAnswerCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectRepository(Review) private readonly repository: Repository<Review>
  ) {}

  async execute({ data }: UpsertReviewAnswerCommand): Promise<boolean> {
    const { reviewId, cubeezUid, answer } = data;
    const review = await this.queryBus.execute<unknown, Review>(new GetReviewQuery(reviewId));
    if (!review) throw new NotFoundException(Error.NOT_FOUND_REVIEW);
    const cubeez = await this.queryBus.execute<unknown, Cubeez>(new GetCubeezQuery(cubeezUid));
    if (!cubeez) throw new NotFoundException(Error.NOT_FOUND_CUBEEZ);

    if (!(review.event.product.cubeez && review.event.product.cubeez.uid === cubeezUid)) {
      throw new ForbiddenException(Error.CAN_NOT_ADD_OR_DELETE_REVIEW_ANSWER);
    }

    await this.repository.update(
      {
        id: reviewId
      },
      {
        cubeez: { uid: cubeezUid },
        answer
      }
    );
    Logger.log({ message: `후기 답변을 추가하거나 수정했습니다.`, reviewId, who: cubeezUid });
    return true;
  }
}
