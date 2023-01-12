import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateRegionDto {
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
