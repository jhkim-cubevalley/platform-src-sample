import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { HomeContentType } from './home-content.entity';

export class SaveHomeContentDto {
  @ApiProperty({
    description: '기타 페이지 종류. 큐비즈 소개, 인센티브 여행 소개, 포인트 적립/사용 안내 (CUBEEZ, INCENTIVE, POINT)',
    required: true,
    enum: ['CUBEEZ', 'INCENTIVE', 'POINT']
  })
  @IsString()
  type: HomeContentType;

  @ApiProperty({
    description: '내용',
    required: true
  })
  @IsString()
  content: string;
}
