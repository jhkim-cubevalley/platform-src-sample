import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllPopupDto {
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
    description: '활성화 여부',
    enum: ['true', 'false'],
    required: false
  })
  @IsString()
  @IsOptional()
  isEnable?: string;
}
