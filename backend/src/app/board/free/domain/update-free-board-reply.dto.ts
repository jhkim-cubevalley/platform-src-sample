import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateFreeBoardReplyDto {
  @ApiProperty({
    description: '댓글 내용',
    required: false
  })
  @IsString()
  reply: string;
}
