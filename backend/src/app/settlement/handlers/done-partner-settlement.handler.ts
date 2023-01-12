import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Error } from '../../../infrastructure/common/error';
import { DonePartnerSettlementCommand } from '../commands/done-partner-settlement.command';
import { PartnerSettlement } from '../domain/partner-settlement.entity';

@Injectable()
@CommandHandler(DonePartnerSettlementCommand)
export class DonePartnerSettlementHandler implements ICommandHandler<DonePartnerSettlementCommand> {
  constructor(@InjectRepository(PartnerSettlement) private readonly repository: Repository<PartnerSettlement>) {}

  async execute({ id }: DonePartnerSettlementCommand): Promise<boolean> {
    const settlement = await this.repository.findOne({ where: { id } });
    if (!settlement) throw new NotFoundException(Error.NOT_FOUND_RESERVATION);
    await this.repository.update({ id }, { settlementStatus: 'done' });
    Logger.log({ message: '제휴파트너의 정산 정보를 완료로 변경했습니다.', id });
    return true;
  }
}
