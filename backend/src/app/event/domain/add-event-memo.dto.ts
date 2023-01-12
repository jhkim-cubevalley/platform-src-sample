import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddEventMemoDto {
  @ApiProperty({
    description: '행사 ID',
    required: true
  })
  @IsNumber()
  eventId: number;

  @ApiProperty({
    description: '메모 제목',
    required: true
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: '메모 내용',
    required: true
  })
  @IsString()
  memo: string;
}
