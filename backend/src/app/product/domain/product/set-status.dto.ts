import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ProductStatus } from './product.entity';

export class SetStatusDto {
  @ApiProperty({
    description: '상품 상태',
    enum: ['temp', 'request_approve', 'approve', 'sale', 'sale_end'],
    required: true
  })
  @IsString()
  status: ProductStatus;
}
