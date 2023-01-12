import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class SetEventTypeDto {
  @ApiProperty({
    description: '행사 타입 UUID',
    required: true
  })
  @IsUUID()
  eventTypeId: string;
}
