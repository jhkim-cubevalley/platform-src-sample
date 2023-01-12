import { Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddNestedInquiryCommand } from '../commands/add-nested-inquiry.command';
import { Inquiry } from '../domain/inquiry.entity';
import { filterHTML } from '../../../infrastructure/common/util';

@Injectable()
@CommandHandler(AddNestedInquiryCommand)
export class AddNestedInquiryHandler implements ICommandHandler<AddNestedInquiryCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectRepository(Inquiry) private readonly inquiryRepository: Repository<Inquiry>
  ) {}

  async execute(command: AddNestedInquiryCommand): Promise<Inquiry> {
    const { title, content, author, parent, category } = command.data;
    const inquiry = this.inquiryRepository.create({
      title: title ?? parent.title,
      content: filterHTML(content),
      author,
      parent,
      category: category ?? parent.category,
      isParent: false
    });
    await this.inquiryRepository.save(inquiry);
    Logger.log({ message: `큐비즈 추가 상담 내용을 추가했습니다.`, id: inquiry.id });
    return inquiry;
  }
}
