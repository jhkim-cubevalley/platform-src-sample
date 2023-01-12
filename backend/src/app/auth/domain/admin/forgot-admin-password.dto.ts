import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotAdminPasswordDto {
  @ApiProperty({
    description: '비밀번호를 찾을 관리자 이메일',
    required: true
  })
  @IsEmail()
  email: string;
}
