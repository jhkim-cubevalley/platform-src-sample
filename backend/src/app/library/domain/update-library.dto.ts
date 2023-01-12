import { IsBoolean, IsObject, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLibraryDto {
  @ApiProperty({
    description: '카드명(한글)',
    required: true
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '카드명(현지)',
    required: true
  })
  @IsString()
  originalName: string;

  @ApiProperty({
    description: '사용유무',
    required: true
  })
  @IsBoolean()
  isUse: boolean;

  @ApiProperty({
    description: '지역 UUID (지역 대분류)',
    required: true
  })
  @IsUUID()
  continent: string;

  @ApiProperty({
    description: '국가 UUID (지역 중분류)',
    required: true
  })
  @IsUUID()
  country: string;

  @ApiProperty({
    description: '도시 UUID (지역 소분류)',
    required: true
  })
  @IsUUID()
  city: string;

  @ApiProperty({
    description: '상세 설명',
    required: true
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: '카테고리',
    required: true
  })
  @IsString()
  category: string;

  @ApiProperty({
    description: '비공개 여부',
    required: true
  })
  @IsBoolean()
  isPrivate: boolean;

  @ApiProperty({
    description: '저장 상태. 임시저장, 게시 (temp / post)',
    required: true
  })
  @IsString()
  status: 'temp' | 'post';

  @ApiProperty({
    description: '기타 정보. JSON 형태로 전달',
    required: true
  })
  @IsObject()
  detail: Record<string, string>;
}
