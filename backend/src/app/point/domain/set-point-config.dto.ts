import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PointConfigKey } from './point-config.entity';

export class SetPointConfigDto {
  @ApiProperty({
    description: '설정 키 (신규 회원 지급, 상품구매시 적립(퍼센트단위), 후기 작성 시 적립)',
    required: true,
    enum: ['NEW_USER_POINT', 'BUY_PRODUCT_POINT', 'REVIEW_POINT']
  })
  @IsString()
  key: PointConfigKey;

  @ApiProperty({
    description: '설정 값',
    required: true
  })
  @IsString()
  value: string;
}
