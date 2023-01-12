import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import SexType from '../../../infrastructure/common/types/sex-type';

export class UpdateUserDto {
  @ApiProperty({
    description: '이름',
    required: true
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '비밀번호 (수정 필요 시 사용)',
    required: false
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: '닉네임',
    required: true
  })
  @IsString()
  nickname: string;

  @ApiProperty({
    description: '성별 (M, F)',
    required: true,
    enum: ['M', 'F']
  })
  @IsString()
  sex: SexType;

  @ApiProperty({
    description: '핸드폰 번호',
    required: true
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'SNS 정보 (배열 형태)',
    required: true,
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        handle: { type: 'string' }
      }
    }
  })
  @IsArray()
  sns: Array<{ name: string; handle: string }>;
}
