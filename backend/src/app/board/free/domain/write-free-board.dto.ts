import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class WriteFreeBoardDto {
  @ApiProperty({
    description: '제목',
    required: true
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: '내용',
    required: true
  })
  @IsString()
  content: string;
}
