import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { EventStatus } from './event.entity';

export class SetEventStatusDto {
  @ApiProperty({
    description: '행사 상태',
    enum: ['display', 'display_stop', 'trip_confirm', 'trip_end'],
    required: true
  })
  @IsString()
  status: EventStatus;

  @ApiProperty({
    description: '큐비즈에게 전할 메시지',
    required: false
  })
  @IsString()
  @IsOptional()
  message?: string;
}
