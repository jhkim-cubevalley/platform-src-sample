import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../domain/review.entity';
import { GetReviewQuery } from '../queries/get-review.query';
import { Error } from '../../../infrastructure/common/error';
import { GetCubeezQuery } from '../../cubeez/queries/get-cubeez.query';
import { Cubeez } from '../../cubeez/domain/cubeez.entity';
import { DeleteReviewAnswerCommand } from '../commands/delete-review-answer.command';

@Injectable()
@CommandHandler(DeleteReviewAnswerCommand)
export class DeleteReviewAnswerHandler implements ICommandHandler<DeleteReviewAnswerCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectRepository(Review) private readonly repository: Repository<Review>
  ) {}

  async execute({ data }: DeleteReviewAnswerCommand): Promise<boolean> {
    const { reviewId, cubeezUid } = data;
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
        cubeez: null,
        answer: null
      }
    );
    Logger.log({ message: `후기 답변을 삭제했습니다.`, reviewId, who: cubeezUid });
    return true;
  }
}
