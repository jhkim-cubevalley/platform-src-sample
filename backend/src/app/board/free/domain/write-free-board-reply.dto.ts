import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class WriteFreeBoardReplyDto {
  @ApiProperty({
    description: '댓글 내용',
    required: true
  })
  @IsString()
  reply: string;

  @ApiProperty({
    description: '게시글 ID',
    required: true
  })
  @IsNumber()
  boardId: number;

  @ApiProperty({
    description: '상위 댓글 ID (대댓글일때만 사용)',
    required: false
  })
  @IsNumber()
  @IsOptional()
  parentId?: number;
}
