import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotCubeezPasswordDto {
  @ApiProperty({
    description: '비밀번호를 찾을 큐비즈 이메일',
    required: true
  })
  @IsEmail()
  email: string;
}
