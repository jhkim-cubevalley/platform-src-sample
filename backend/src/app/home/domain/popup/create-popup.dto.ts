import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePopupDto {
  @ApiProperty({
    description: '팝업 제목',
    required: true
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: '링크',
    required: true
  })
  @IsString()
  link: string;

  @ApiProperty({
    description: '이미지 링크',
    required: false
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    description: '쿠키 사용여부',
    required: true
  })
  @IsBoolean()
  useCookie: boolean;

  @ApiProperty({
    description: '쿠키 시간 (일 단위) (쿠키 사용 시 전달)',
    required: false
  })
  @IsNumber()
  @IsOptional()
  cookieDay?: number;

  @ApiProperty({
    description: '활성화 여부 (기본값 true)',
    required: false
  })
  @IsBoolean()
  @IsOptional()
  isEnable?: boolean;
}
