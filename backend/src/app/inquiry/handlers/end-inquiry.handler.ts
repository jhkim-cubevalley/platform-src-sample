import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, ConflictException, Injectable, Logger } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { Inquiry } from '../domain/inquiry.entity';
import { GetInquiryQuery } from '../queries/get-inquiry.query';
import { EndInquiryCommand } from '../commands/end-inquiry.command';
import { Error } from '../../../infrastructure/common/error';

@Injectable()
@CommandHandler(EndInquiryCommand)
export class EndInquiryHandler implements ICommandHandler<EndInquiryCommand> {
  constructor(
    @InjectRepository(Inquiry) private readonly inquiryRepository: Repository<Inquiry>,
    private readonly queryBus: QueryBus
  ) {}

  async execute({ inquiry }: EndInquiryCommand): Promise<boolean> {
    const prevData = await this.queryBus.execute<unknown, Inquiry>(new GetInquiryQuery(inquiry.id));

    if (prevData.endAt) {
      throw new ConflictException(Error.INQUIRY_ALREADY_END);
    }

    if (!prevData.isParent) {
      throw new BadRequestException(Error.CAN_NOT_END_INQUIRY);
    }

    if (!(dayjs(prevData.updatedAt).add(7, 'day').unix() <= dayjs().unix())) {
      throw new BadRequestException(Error.CAN_END_INQUIRY_AFTER_7D);
    }

    const { affected } = await this.inquiryRepository.update(
      {
        id: inquiry.id
      },
      {
        endAt: new Date()
      }
    );
    Logger.log({ message: `큐비즈 상담을 종료했습니다.`, id: inquiry.id });
    return affected > 0;
  }
}
