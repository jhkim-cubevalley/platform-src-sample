import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import GroupType from '../../../../infrastructure/common/types/group-type';

export class GetAllGroupDto {
  @ApiProperty({
    description: '페이지',
    required: false
  })
  @IsNumber()
  @IsOptional()
  offset?: number;

  @ApiProperty({
    description: '페이지 당 데이터 개수',
    required: false
  })
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiProperty({
    description: '계정 종류. 공백 시 전체 그룹을 가져옵니다. (고객, 큐비즈, 관리자)',
    required: false,
    enum: ['USER', 'CUBEEZ', 'ADMIN']
  })
  @IsString()
  @IsOptional()
  type?: GroupType;
}
