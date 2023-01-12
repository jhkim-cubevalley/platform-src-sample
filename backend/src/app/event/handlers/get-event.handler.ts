import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetEventQuery } from '../queries/get-event.query';
import { Event } from '../domain/event.entity';

@Injectable()
@QueryHandler(GetEventQuery)
export class GetEventHandler implements IQueryHandler<GetEventQuery> {
  constructor(@InjectRepository(Event) private readonly repository: Repository<Event>) {}

  async execute({ id }: GetEventQuery): Promise<Event> {
    const result = await this.repository.findOne({
      where: {
        id
      },
      relations: {
        product: {
          cubeez: true,
          admin: true,
          promotionProducts: {
            promotion: true
          }
        },
        editFiles: true,
        histories: true,
        memos: true,
        eventType: {
          flights: true,
          plans: {
            planDetails: true
          }
        },
        reviews: true
      }
    });
    if (!result) return undefined;
    return result;
  }
}
