import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SendReservationMessageDto {
  @ApiProperty({
    description: '예약자 이메일',
    required: true
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '메시지 종류',
    required: true,
    enum: ['before', 'after', 'done', 'cancel']
  })
  type: 'before' | 'after' | 'done' | 'cancel';
}
