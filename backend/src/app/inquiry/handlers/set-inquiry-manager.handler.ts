import { Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SetInquiryManagerCommand } from '../commands/set-inquiry-manager.command';
import { Inquiry } from '../domain/inquiry.entity';

@Injectable()
@CommandHandler(SetInquiryManagerCommand)
export class SetInquiryManagerHandler implements ICommandHandler<SetInquiryManagerCommand> {
  constructor(@InjectRepository(Inquiry) private readonly inquiryRepository: Repository<Inquiry>) {}

  async execute({ data }: SetInquiryManagerCommand): Promise<boolean> {
    const { inquiry, manager } = data;
    const { affected } = await this.inquiryRepository.update(
      {
        id: inquiry.id
      },
      {
        manager
      }
    );
    Logger.log({ message: `큐비즈 상담에 담당자를 배정했습니다.`, id: inquiry.id, managerId: manager.uid });
    return affected > 0;
  }
}
