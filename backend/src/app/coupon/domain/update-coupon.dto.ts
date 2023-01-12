import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCouponDto {
  @ApiProperty({
    description: '쿠폰명 (한글)',
    required: false
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: '쿠폰명 (영어)',
    required: false
  })
  @IsString()
  @IsOptional()
  nameEn?: string;

  @ApiProperty({
    description: '활성화여부',
    required: false
  })
  @IsBoolean()
  @IsOptional()
  isEnable?: boolean;

  @ApiProperty({
    description: '유효기간 시작일',
    example: '2022-01-01',
    required: false
  })
  @IsString()
  @IsOptional()
  dateFrom?: string;

  @ApiProperty({
    description: '유효기간 종료일',
    example: '2022-01-01',
    required: false
  })
  @IsString()
  @IsOptional()
  dateTo?: string;

  @ApiProperty({
    description: '할인금액 (원)',
    required: false
  })
  @IsNumber()
  @IsOptional()
  salePrice?: number;

  @ApiProperty({
    description: '발행수',
    required: false
  })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiProperty({
    description: '중복사용 여부',
    required: false
  })
  @IsBoolean()
  @IsOptional()
  canDuplicate?: boolean;

  @ApiProperty({
    description: '제휴파트너 UUID',
    required: false
  })
  @IsUUID()
  @IsOptional()
  partnerId?: string;
}
