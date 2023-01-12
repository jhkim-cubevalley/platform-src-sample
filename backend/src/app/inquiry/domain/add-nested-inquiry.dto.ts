import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddNestedInquiryDto {
  @ApiProperty({
    description: '상담 제목',
    required: false
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: '상담 내용',
    required: true
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: '상담 카테고리',
    required: false
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({
    description: '상위 상담 데이터 ID',
    required: true
  })
  @IsNumber()
  parent: number;
}
