import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class SetManagerProductDto {
  @ApiProperty({
    description: '담당그룹ID',
    required: true
  })
  @IsUUID()
  groupId: string;
}
