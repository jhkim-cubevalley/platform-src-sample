import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @ApiProperty({
    description: '이메일',
    required: true
  })
  @IsEmail()
  email: string;
}
