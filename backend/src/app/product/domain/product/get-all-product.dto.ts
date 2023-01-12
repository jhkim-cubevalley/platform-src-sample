import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class GetAllProductDto {
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
    description:
      '상태 필터링. 임시저장, 검수중, 판매중, 판매완료, 승인, 반려, 승인요청 (temp, inspect, sale, sale_end, approve, deny, request_approve)',
    required: false,
    enum: ['temp', 'inspect', 'sale', 'sale_end', 'approve', 'deny', 'request_approve']
  })
  @IsString()
  @IsOptional()
  status?: 'temp' | 'inspect' | 'sale' | 'sale_end' | 'approve' | 'deny' | 'request_approve';

  @ApiProperty({
    description: '출발일 필터링. 시작일 (예: 2022-10-01)',
    required: false
  })
  @IsString()
  @IsOptional()
  dateFrom?: string;

  @ApiProperty({
    description: '출발일 필터링. 종료일 (예: 2022-10-01)',
    required: false
  })
  @IsString()
  @IsOptional()
  dateTo?: string;

  @ApiProperty({
    description: '지역 필터링 (대륙 UUID)',
    required: false
  })
  @IsUUID()
  @IsOptional()
  continent?: string;

  @ApiProperty({
    description: '지역 필터링 (나라 UUID)',
    required: false
  })
  @IsUUID()
  @IsOptional()
  country?: string;

  @ApiProperty({
    description: '큐비즈명 필터링 (/product/me API에서는 사용 불가능합니다.)',
    required: false
  })
  @IsString()
  @IsOptional()
  cubeezName?: string;

  @ApiProperty({
    description: '상품명 필터링',
    required: false
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: '메뉴카테고리 필터링 (대분류 UUID)',
    required: false
  })
  @IsUUID()
  @IsOptional()
  categoryOne?: string;

  @ApiProperty({
    description: '메뉴카테고리 필터링 (중분류 UUID)',
    required: false
  })
  @IsUUID()
  @IsOptional()
  categoryTwo?: string;

  @ApiProperty({
    description: '메뉴카테고리 필터링 (소분류 UUID)',
    required: false
  })
  @IsUUID()
  @IsOptional()
  categoryThree?: string;
}
