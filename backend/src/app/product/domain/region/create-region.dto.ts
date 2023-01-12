import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({
    description: '지역 이름',
    required: true
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '분류코드',
    required: true
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: '분류. 숫자가 높을 수록 하위 분류입니다.',
    required: true
  })
  @IsNumber()
  depth: number;

  @ApiProperty({
    description: '우선순위',
    required: true
  })
  @IsNumber()
  priority: number;

  @ApiProperty({
    description: '활성여부',
    required: true
  })
  @IsBoolean()
  isEnable: boolean;

  @ApiProperty({
    description: '부모 지역. 상위 지역이 있을 경우 지역ID를 전달합니다.',
    required: false
  })
  @IsUUID()
  @IsOptional()
  parentId?: string;
}
