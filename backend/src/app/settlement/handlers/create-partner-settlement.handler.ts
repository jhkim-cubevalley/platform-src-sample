import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Error } from '../../../infrastructure/common/error';
import { PartnerSettlement } from '../domain/partner-settlement.entity';
import { CreatePartnerSettlementCommand } from '../commands/create-partner-settlement.command';
import { GetPartnerQuery } from '../../partner/queries/get-partner.query';
import { GetEventQuery } from '../../event/queries/get-event.query';

@Injectable()
@CommandHandler(CreatePartnerSettlementCommand)
export class CreatePartnerSettlementHandler implements ICommandHandler<CreatePartnerSettlementCommand> {
  constructor(
    @InjectRepository(PartnerSettlement) private readonly repository: Repository<PartnerSettlement>,
    private readonly queryBus: QueryBus
  ) {}

  async execute({ data }: CreatePartnerSettlementCommand): Promise<PartnerSettlement> {
    const existsPartner = await this.queryBus.execute(new GetPartnerQuery(data.partnerId));
    if (!existsPartner) throw new NotFoundException(Error.NOT_FOUND_PARTNER);
    const existsEvent = await this.queryBus.execute(new GetEventQuery(data.eventId));
    if (!existsEvent) throw new NotFoundException(Error.NOT_FOUND_EVENT);

    const result = this.repository.create({
      ...data,
      settlementStatus: 'not',
      partner: {
        id: data.partnerId
      },
      event: {
        id: data.eventId
      }
    });
    await this.repository.save(result);
    Logger.log({ message: '새로운 제휴파트너의 정산 정보를 생성했습니다.', id: result.id });
    return result;
  }
}
