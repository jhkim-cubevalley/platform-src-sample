import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PointTransaction } from '../domain/point-transaction.entity';
import { AddPointTransactionCommand } from '../commands/add-point-transaction.command';
import { GetUserQuery } from '../../user/queries/get-user.query';
import { Error } from '../../../infrastructure/common/error';

@Injectable()
@CommandHandler(AddPointTransactionCommand)
export class AddPointTransactionHandler implements ICommandHandler<AddPointTransactionCommand> {
  constructor(
    @InjectRepository(PointTransaction) private readonly repository: Repository<PointTransaction>,
    private readonly queryBus: QueryBus
  ) {}

  async execute({ data }: AddPointTransactionCommand): Promise<PointTransaction> {
    const existsUser = await this.queryBus.execute(new GetUserQuery(data.userUid));
    if (!existsUser) throw new NotFoundException(Error.NOT_FOUND_USER);

    const transaction = this.repository.create({
      user: { uid: data.userUid },
      value: data.value,
      cause: data.cause
    });
    if (data.dbTransaction) await data.dbTransaction.save(transaction);
    else await this.repository.save(transaction);
    Logger.log({ message: '포인트 거래내역을 기록했습니다.', uid: data.userUid });
    return transaction;
  }
}
