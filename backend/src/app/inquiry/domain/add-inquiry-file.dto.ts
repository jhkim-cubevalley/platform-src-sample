import { ApiProperty } from '@nestjs/swagger';

export class AddInquiryFileDto {
  @ApiProperty({
    description: '파일',
    required: true,
    type: 'string',
    format: 'binary'
  })
  image: Buffer;
}
