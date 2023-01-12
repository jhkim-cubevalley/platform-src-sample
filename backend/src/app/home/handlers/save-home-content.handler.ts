import { Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HomeContent } from '../domain/home-content.entity';
import { SaveHomeContentCommand } from '../commands/save-home-content.command';
import { GetHomeContentQuery } from '../queries/get-home-content.query';
import { filterHTML } from '../../../infrastructure/common/util';

@Injectable()
@CommandHandler(SaveHomeContentCommand)
export class SaveHomeContentHandler implements ICommandHandler<SaveHomeContentCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectRepository(HomeContent) private readonly homeContentRepository: Repository<HomeContent>
  ) {}

  async execute({ data }: SaveHomeContentCommand): Promise<HomeContent> {
    const { type, content } = data;
    const exists = await this.queryBus.execute(new GetHomeContentQuery(type));
    const clearContent = filterHTML(content);

    if (!exists) {
      const result = this.homeContentRepository.create({
        type,
        content: clearContent
      });
      await this.homeContentRepository.save(result);
      Logger.log({ message: `기타 페이지 내용을 새로 생성했습니다.`, type });
      return result;
    }

    exists.content = clearContent;
    await this.homeContentRepository.save(exists);
    Logger.log({ message: `기타 페이지 내용을 저장했습니다.`, type });
    return exists;
  }
}
