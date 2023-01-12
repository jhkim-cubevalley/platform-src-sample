import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class SetContractToProductDto {
  @ApiProperty({
    description: '계약서ID',
    required: true
  })
  @IsNumber()
  contractId: number;
}
