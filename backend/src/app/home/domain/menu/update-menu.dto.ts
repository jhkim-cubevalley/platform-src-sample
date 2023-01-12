import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateMenuDto {
  @ApiProperty({
    description: '메뉴 카테고리명(한글)',
    required: true
  })
  @IsString()
  nameKo: string;

  @ApiProperty({
    description: '메뉴 카테고리명(영문)',
    required: true
  })
  @IsString()
  nameEn: string;

  @ApiProperty({
    description: '분류코드',
    required: true
  })
  @IsString()
  code: string;

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
}
