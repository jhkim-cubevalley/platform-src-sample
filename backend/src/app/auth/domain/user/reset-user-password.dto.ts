import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetUserPasswordDto {
  @ApiProperty({
    description: '/auth/forgot/user/password API 호출 후 전달받은 메일에 있는 ID입니다.',
    required: true
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: '새 비밀번호',
    required: true
  })
  @IsString()
  newPassword: string;
}
