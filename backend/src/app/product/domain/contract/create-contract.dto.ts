import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateContractDto {
  @ApiProperty({
    description: '계약서 이름',
    required: true
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '계약서 상단내용 (선택. 미입력 시 기본값으로 설정됩니다.)',
    required: false
  })
  @IsString()
  @IsOptional()
  header?: string;

  @ApiProperty({
    description: '약관ID 목록',
    required: true
  })
  @IsArray()
  tos: string[];

  @ApiProperty({
    description: '영업 보증보험 가입여부',
    required: true
  })
  @IsBoolean()
  isBusins: boolean;

  @ApiProperty({
    description: '영업 보증보험 가입금액',
    required: true
  })
  @IsNumber()
  businsPrice: number;

  @ApiProperty({
    description: '영업 보증보험 보험기간 시작일',
    required: true
  })
  @IsDateString()
  businsDateFrom: Date;

  @ApiProperty({
    description: '영업 보증보험 보험기간 종료일',
    required: true
  })
  @IsDateString()
  businsDateTo: Date;

  @ApiProperty({
    description: '필수항목 (콤마(,)로 구분합니다.)',
    required: true
  })
  @IsString()
  require: string;

  @ApiProperty({
    description: '기타 선택 항목(추가경비) (콤마(,)로 구분합니다.)',
    required: true
  })
  @IsString()
  select: string;

  @ApiProperty({
    description: '여행인솔자 내용',
    required: true
  })
  @IsString()
  tripLeader: string;

  @ApiProperty({
    description: '현지 가이드 내용',
    required: true
  })
  @IsString()
  guide: string;

  @ApiProperty({
    description: '현지교통 내용',
    required: true
  })
  @IsString()
  traffic: string;

  @ApiProperty({
    description: '현지 여행사 여부',
    required: true
  })
  @IsBoolean()
  isCompany: boolean;

  @ApiProperty({
    description: '자유일정 여부',
    required: true
  })
  @IsBoolean()
  isFree: boolean;

  @ApiProperty({
    description: '계약서상 안내',
    required: true
  })
  @IsString()
  info: string;

  @ApiProperty({
    description: '환불규정',
    required: true
  })
  @IsString()
  refund: string;

  @ApiProperty({
    description: '저장상태 (임시저장, 게시)',
    required: true,
    enum: ['temp', 'post']
  })
  @IsString()
  status: 'temp' | 'post';
}
