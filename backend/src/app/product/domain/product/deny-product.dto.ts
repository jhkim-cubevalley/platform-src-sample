import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DenyProductDto {
  @ApiProperty({
    description: '반려 사유',
    required: true
  })
  @IsString()
  reason: string;
}
