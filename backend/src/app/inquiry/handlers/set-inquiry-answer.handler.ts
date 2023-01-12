import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry } from '../domain/inquiry.entity';
import { SetInquiryAnswerCommand } from '../commands/set-inquiry-answer.command';
import { GetInquiryQuery } from '../queries/get-inquiry.query';
import { Error } from '../../../infrastructure/common/error';
import { filterHTML } from '../../../infrastructure/common/util';

@Injectable()
@CommandHandler(SetInquiryAnswerCommand)
export class SetInquiryAnswerHandler implements ICommandHandler<SetInquiryAnswerCommand> {
  constructor(
    @InjectRepository(Inquiry) private readonly inquiryRepository: Repository<Inquiry>,
    private readonly queryBus: QueryBus
  ) {}

  async execute({ data }: SetInquiryAnswerCommand): Promise<boolean> {
    const { inquiry, answer } = data;
    const prevData = await this.queryBus.execute<unknown, Inquiry>(new GetInquiryQuery(inquiry.id));

    if (prevData.endAt !== null) {
      throw new BadRequestException(Error.CAN_NOT_ANSWER);
    }

    const { affected } = await this.inquiryRepository.update(
      {
        id: inquiry.id
      },
      {
        answer: filterHTML(answer),
        answeredAt: new Date()
      }
    );
    Logger.log({ message: `큐비즈 상담에 답변을 등록했습니다.`, id: inquiry.id });
    return affected > 0;
  }
}
