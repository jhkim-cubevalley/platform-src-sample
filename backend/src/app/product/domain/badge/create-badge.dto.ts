import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateBadgeDto {
  @ApiProperty({
    description: '뱃지 이름 (예: 인기상품, MD추천)',
    required: true
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '뱃지 유형 (패키지/단품)',
    enum: ['패키지/단품'],
    required: true
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: '상품ID',
    required: true
  })
  @IsNumber()
  productId: number;

  @ApiProperty({
    description: '지역UUID',
    required: true
  })
  @IsUUID()
  regionOneId: string;

  @ApiProperty({
    description: '국가UUID',
    required: true
  })
  @IsUUID()
  regionTwoId: string;

  @ApiProperty({
    description: '도시UUID',
    required: true
  })
  @IsUUID()
  regionThreeId: string;
}
