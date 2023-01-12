import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetCouponStatDto {
  @ApiProperty({
    description: '기간 시작일',
    example: '2022-01-01',
    required: false
  })
  @IsString()
  @IsOptional()
  dateFrom?: string;

  @ApiProperty({
    description: '기간 종료일',
    example: '2022-01-01',
    required: false
  })
  @IsString()
  @IsOptional()
  dateTo?: string;
}
