import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGroupDto {
  @ApiProperty({
    description: '그룹명',
    required: true
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '설명',
    required: true
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: '수수료 배율(%). 큐비즈 그룹 추가 시에만 사용 (소수점 사용 가능)',
    required: false
  })
  @IsNumber()
  @IsOptional()
  commissionMultiple?: number;

  @ApiProperty({
    description: '포인트 배율(%). 고객 그룹 추가 시에만 사용 (소수점 사용 가능)',
    required: false
  })
  @IsNumber()
  @IsOptional()
  pointMultiple?: number;
}
