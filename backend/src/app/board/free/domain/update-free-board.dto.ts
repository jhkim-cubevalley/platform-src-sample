import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateFreeBoardDto {
  @ApiProperty({
    description: '제목',
    required: false
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: '내용',
    required: false
  })
  @IsString()
  @IsOptional()
  content?: string;
}
