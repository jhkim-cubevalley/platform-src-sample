import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllFreeBoardDto {
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
    description: '제목 필터링',
    required: false
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: '작성자 필터링',
    required: false
  })
  @IsString()
  @IsOptional()
  authorName?: string;

  @ApiProperty({
    description: '작성일 필터링 시작',
    required: false,
    example: '2022-01-01'
  })
  @IsString()
  @IsOptional()
  dateFrom?: string;

  @ApiProperty({
    description: '작성일 필터링 끝',
    required: false,
    example: '2022-01-01'
  })
  @IsString()
  @IsOptional()
  dateTo?: string;
}
