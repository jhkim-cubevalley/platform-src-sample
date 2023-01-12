import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddProductImageDto {
  @ApiProperty({
    description: '이미지',
    required: true,
    type: 'string',
    format: 'binary'
  })
  image: Buffer;

  @ApiProperty({
    description: '대표이미지 여부',
    required: true,
    enum: ['true', 'false']
  })
  @IsString()
  isThumb: string;
}
