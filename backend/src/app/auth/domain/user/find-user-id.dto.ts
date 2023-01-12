import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindUserIdDto {
  @ApiProperty({
    description: '고객 핸드폰 번호',
    required: true
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: '핸드폰 인증코드',
    required: true
  })
  @IsString()
  phoneCode: string;
}
