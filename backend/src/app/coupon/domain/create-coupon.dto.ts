import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCouponDto {
  @ApiProperty({
    description: '쿠폰 대표코드',
    required: true
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: '쿠폰명 (한글)',
    required: true
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '쿠폰명 (영어)',
    required: true
  })
  @IsString()
  nameEn: string;

  @ApiProperty({
    description: '활성화여부',
    required: true
  })
  @IsBoolean()
  isEnable: boolean;

  @ApiProperty({
    description: '유효기간 시작일',
    example: '2022-01-01',
    required: true
  })
  @IsString()
  dateFrom: string;

  @ApiProperty({
    description: '유효기간 종료일',
    example: '2022-01-01',
    required: true
  })
  @IsString()
  dateTo: string;

  @ApiProperty({
    description: '할인금액 (원)',
    required: true
  })
  @IsNumber()
  salePrice: number;

  @ApiProperty({
    description: '발행수',
    required: true
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: '중복사용 여부',
    required: true
  })
  @IsBoolean()
  canDuplicate: boolean;

  @ApiProperty({
    description: '제휴파트너 UUID',
    required: false
  })
  @IsUUID()
  @IsOptional()
  partnerId?: string;
}
