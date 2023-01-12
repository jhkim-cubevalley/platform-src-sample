import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotUserPasswordDto {
  @ApiProperty({
    description: '비밀번호를 찾을 고객 이메일',
    required: true
  })
  @IsEmail()
  email: string;
}
