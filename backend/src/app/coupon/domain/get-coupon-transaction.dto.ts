import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetCouponTransactionDto {
  @ApiProperty({
    description: '페이지',
    required: false
  })
  @IsNumber()
  @IsOptional()
  offset?: number;

  @ApiProperty({
    description: '페이지 당 데이터 개수',
    required: false
  })
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiProperty({
    description: '사용자명',
    required: false
  })
  @IsString()
  @IsOptional()
  userName?: string;
}
