import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllMenuDto {
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
    description: '정렬. 인기순, 최신순 (best, newest)',
    enum: ['best', 'newest'],
    required: false
  })
  @IsString()
  @IsOptional()
  sort?: 'best' | 'newest';
}
