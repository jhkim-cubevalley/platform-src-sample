import { ApiProperty } from '@nestjs/swagger';

export class AddLibraryImageDto {
  @ApiProperty({
    description: '이미지',
    required: true,
    type: 'string',
    format: 'binary'
  })
  image: Buffer;
}
