import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllCouponDto {
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
    description: '활성화 여부',
    enum: ['true', 'false'],
    required: false
  })
  @IsString()
  @IsOptional()
  isEnable?: string;

  @ApiProperty({
    description: '제휴파트너 쿠폰만 표시',
    enum: ['true', 'false'],
    required: false
  })
  @IsString()
  @IsOptional()
  onlyPartner?: string;
}
