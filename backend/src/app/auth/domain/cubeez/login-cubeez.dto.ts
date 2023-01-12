import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginCubeezDto {
  @ApiProperty({
    description: '큐비즈 로그인 아이디(이메일 형식)',
    required: true
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '큐비즈 로그인 비밀번호',
    required: true
  })
  @IsString()
  password: string;
}
