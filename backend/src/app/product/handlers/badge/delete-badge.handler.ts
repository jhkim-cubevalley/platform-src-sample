import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Badge } from '../../domain/badge/badge.entity';
import { DeleteBadgeCommand } from '../../commands/badge/delete-badge.command';
import { Error } from '../../../../infrastructure/common/error';

@Injectable()
@CommandHandler(DeleteBadgeCommand)
export class DeleteBadgeHandler implements ICommandHandler<DeleteBadgeCommand> {
  constructor(@InjectRepository(Badge) private readonly badgeRepository: Repository<Badge>) {}

  async execute({ id }: DeleteBadgeCommand): Promise<boolean> {
    const { affected } = await this.badgeRepository.delete({ id });
    if (affected <= 0) throw new NotFoundException(Error.NOT_FOUND_BADGE);
    Logger.log({ message: '뱃지를 삭제했습니다.', id });
    return true;
  }
}
