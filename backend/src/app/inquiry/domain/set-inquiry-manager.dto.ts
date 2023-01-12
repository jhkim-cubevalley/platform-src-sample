import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class SetInquiryManagerDto {
  @ApiProperty({
    description: '담당자 UUID',
    required: true
  })
  @IsUUID()
  manager: string;
}
