import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../domain/review.entity';
import { SendRequestAnswerCommand } from '../commands/send-request-answer.command';
import { SendNotificationCommand } from '../../notification/commands/send-notification.command';
import { SendEmailCommand } from '../../email/send-email.command';

@Injectable()
@CommandHandler(SendRequestAnswerCommand)
export class SendRequestAnswerHandler implements ICommandHandler<SendRequestAnswerCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @InjectRepository(Review) private readonly repository: Repository<Review>
  ) {}

  async execute({ data }: SendRequestAnswerCommand): Promise<boolean> {
    const { eventId } = data;
    const noAnswerReviews = await this.repository.find({
      where: {
        event: eventId ? { id: eventId } : undefined,
        cubeez: null,
        answer: null
      },
      relations: { event: { product: { cubeez: true } } }
    });

    const who = await Promise.all(
      noAnswerReviews.map(async ({ id, event }) => {
        if (!event.product.cubeez) return '';
        const { email } = event.product.cubeez;
        await this.commandBus.execute(
          new SendNotificationCommand(
            'CUBEEZ',
            {
              type: 'REQUEST_REVIEW_ANSWER',
              payload: {
                reviewId: id
              }
            },
            email
          )
        );
        await this.commandBus.execute(
          new SendEmailCommand({
            to: [email],
            subject: `[큐비즈] ${event.product.name} 여행상품 후기에 답변을 달아주세요.`,
            body: `${event.product.name} 여행상품 ${new Date(
              event.startDate
            ).toDateString()} 날짜에 답변이 달리지 않은 후기가 있습니다. 답변을 달아주세요.`
          })
        );
        return email;
      })
    );
    Logger.log({ message: `답변을 달지 않는 큐비즈에게 알림을 전송했습니다.`, who: who.filter((i) => i !== '') });
    return true;
  }
}
