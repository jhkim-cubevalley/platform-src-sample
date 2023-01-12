import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RequestProductDto {
  @ApiProperty({
    description: '승인 요청 메시지',
    required: true
  })
  @IsString()
  requestMessage: string;
}
