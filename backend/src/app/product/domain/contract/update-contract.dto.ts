import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateContractDto {
  @ApiProperty({
    description: '계약서 이름',
    required: false
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: '계약서 상단내용',
    required: false
  })
  @IsString()
  @IsOptional()
  header?: string;

  @ApiProperty({
    description: '약관ID 목록',
    required: false
  })
  @IsArray()
  @IsOptional()
  tos?: string[];

  @ApiProperty({
    description: '영업 보증보험 가입여부',
    required: false
  })
  @IsBoolean()
  @IsOptional()
  isBusins?: boolean;

  @ApiProperty({
    description: '영업 보증보험 가입금액',
    required: false
  })
  @IsNumber()
  @IsOptional()
  businsPrice?: number;

  @ApiProperty({
    description: '영업 보증보험 보험기간 시작일',
    required: false
  })
  @IsDateString()
  @IsOptional()
  businsDateFrom?: Date;

  @ApiProperty({
    description: '영업 보증보험 보험기간 종료일',
    required: false
  })
  @IsDateString()
  @IsOptional()
  businsDateTo?: Date;

  @ApiProperty({
    description: '필수항목 (콤마(,)로 구분합니다.)',
    required: false
  })
  @IsString()
  @IsOptional()
  require?: string;

  @ApiProperty({
    description: '기타 선택 항목(추가경비) (콤마(,)로 구분합니다.)',
    required: false
  })
  @IsString()
  @IsOptional()
  select?: string;

  @ApiProperty({
    description: '여행인솔자 내용',
    required: false
  })
  @IsString()
  @IsOptional()
  tripLeader?: string;

  @ApiProperty({
    description: '현지 가이드 내용',
    required: false
  })
  @IsString()
  @IsOptional()
  guide?: string;

  @ApiProperty({
    description: '현지교통 내용',
    required: false
  })
  @IsString()
  @IsOptional()
  traffic?: string;

  @ApiProperty({
    description: '현지 여행사 여부',
    required: false
  })
  @IsBoolean()
  @IsOptional()
  isCompany?: boolean;

  @ApiProperty({
    description: '자유일정 여부',
    required: false
  })
  @IsBoolean()
  @IsOptional()
  isFree?: boolean;

  @ApiProperty({
    description: '계약서상 안내',
    required: false
  })
  @IsString()
  @IsOptional()
  info?: string;

  @ApiProperty({
    description: '환불규정',
    required: false
  })
  @IsString()
  @IsOptional()
  refund?: string;

  @ApiProperty({
    description: '저장상태 (임시저장, 게시)',
    required: true,
    enum: ['temp', 'post']
  })
  @IsString()
  status: 'temp' | 'post';
}
