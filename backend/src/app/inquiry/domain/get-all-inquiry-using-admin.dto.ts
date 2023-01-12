import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllInquiryUsingAdminDto {
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
    description: '큐비즈 이메일 필터링',
    required: false
  })
  @IsString()
  @IsOptional()
  cubeezEmail?: string;

  @ApiProperty({
    description: '상태 필터링. 문의중, 답변완료, 문의종료 (notanswer / answered / closed)',
    required: false
  })
  @IsString()
  @IsOptional()
  status?: 'notanswer' | 'answered' | 'closed';

  @ApiProperty({
    description: '상담 제목 필터링',
    required: false
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: '상담 내용 필터링',
    required: false
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({
    description: '상담 작성일 필터링 (예: 2022-10-01)',
    required: false
  })
  @IsString()
  @IsOptional()
  createdAt?: string;
}
