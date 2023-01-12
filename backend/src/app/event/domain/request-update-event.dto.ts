import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RequestUpdateEventDto {
  @ApiProperty({
    description: '수정해야할 사유와 내용',
    required: true
  })
  @IsString()
  editMessage: string;
}
