import { ApiProperty } from '@nestjs/swagger';

export class UploadImageDto {
  @ApiProperty({
    description: '이미지',
    required: true,
    type: 'string',
    format: 'binary'
  })
  upload: Buffer;
}
