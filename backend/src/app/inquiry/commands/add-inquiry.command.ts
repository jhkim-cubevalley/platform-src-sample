import { ICommand } from '@nestjs/cqrs';
import { Cubeez } from '../../cubeez/domain/cubeez.entity';

export class AddInquiryCommand implements ICommand {
  constructor(
    readonly data: {
      readonly title: string;
      readonly content: string;
      readonly category: string;
      readonly author: Cubeez;
      readonly productId?: number;
    }
  ) {}
}
