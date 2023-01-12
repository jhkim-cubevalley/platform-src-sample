import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllLibraryDto {
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
    description: '상태 필터링. 내가 볼 수 있는 전체카드, 내가 만든 카드, 공식카드 (all / me / admin)',
    required: false
  })
  @IsString()
  @IsOptional()
  status?: 'all' | 'me' | 'admin';

  @ApiProperty({
    description: '카드명 필터링',
    required: false
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: '생성일 필터링. 시작일 (예: 2022-10-01)',
    required: false
  })
  @IsString()
  @IsOptional()
  createdFrom?: string;

  @ApiProperty({
    description: '생성일 필터링. 종료일 (예: 2022-10-01)',
    required: false
  })
  @IsString()
  @IsOptional()
  createdTo?: string;

  @ApiProperty({
    description: '지역 필터링',
    required: false
  })
  @IsString()
  @IsOptional()
  continent?: string;

  @ApiProperty({
    description: '나라 필터링',
    required: false
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({
    description: '도시 필터링',
    required: false
  })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({
    description: '큐비즈명 필터링',
    required: false
  })
  @IsString()
  @IsOptional()
  cubeezName?: string;
}
