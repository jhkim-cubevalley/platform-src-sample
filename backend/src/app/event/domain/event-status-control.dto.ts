import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EventStatusControlDto {
  @ApiProperty({
    description: '큐비즈에게 전달할 메시지',
    required: true
  })
  @IsString()
  adminMessage: string;
}
