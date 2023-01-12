import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry } from '../domain/inquiry.entity';
import { GetInquiryQuery } from '../queries/get-inquiry.query';

@Injectable()
@QueryHandler(GetInquiryQuery)
export class GetInquiryHandler implements IQueryHandler<GetInquiryQuery> {
  constructor(@InjectRepository(Inquiry) private readonly inquiryRepository: Repository<Inquiry>) {}

  async execute({ id }: GetInquiryQuery): Promise<Inquiry | undefined> {
    const result = await this.inquiryRepository.findOne({
      where: {
        id
      },
      relations: {
        author: true,
        manager: true,
        next: true,
        product: true
      }
    });
    if (!result) return undefined;
    return result;
  }
}
