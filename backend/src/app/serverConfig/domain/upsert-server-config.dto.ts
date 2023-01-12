import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ServerConfigKey } from './server-config.entity';

export class UpsertServerConfigDto {
  @ApiProperty({
    description: '설정 키',
    enum: ['AFTER_PRICE_RATE', 'BEFORE_PRICE_RATE'],
    required: true
  })
  @IsString()
  key: ServerConfigKey;

  @ApiProperty({
    description: '설정 값 (모든 설정 값은 string으로 저장됩니다.)',
    required: true
  })
  @IsString()
  value: string;
}
