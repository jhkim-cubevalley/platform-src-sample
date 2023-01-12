import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventTypeDto {
  @ApiProperty({
    description: '여행상품ID',
    required: true
  })
  @IsNumber()
  productId: number;

  @ApiProperty({
    description: '타입명 (A 외 타입 이름 사용)',
    required: true
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: '타입설명',
    required: true
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: '유류할증료',
    required: true
  })
  @IsNumber()
  fuelSurcharge: number;

  @ApiProperty({
    description: '성인 가격',
    required: true
  })
  @IsNumber()
  priceAdult: number;

  @ApiProperty({
    description: '아동 가격',
    required: true
  })
  @IsNumber()
  priceTeen: number;

  @ApiProperty({
    description: '유아 가격',
    required: true
  })
  @IsNumber()
  priceKid: number;

  @ApiProperty({
    description: '행사타입을 변경할 출발일(Date) 배열',
    required: true
  })
  @IsArray()
  @Type(() => Array<Date>)
  startDate: Date[];

  @ApiProperty({
    description: '항공편 데이터',
    required: true,
    type: 'array',
    items: {
      type: 'object',
      properties: {
        flightType: {
          type: 'string',
          description: '항공편 종류. 도착, 출발 (arrival, departure)',
          enum: ['arrival', 'departure']
        },
        isLayover: { type: 'boolean', description: '경유 여부' },
        flightName: { type: 'string', description: '항공편' },
        company: { type: 'string', description: '운영사' },
        seatRank: { type: 'string', description: '좌석등급' },
        canChange: { type: 'boolean', description: '변경 가능 여부' },
        departureTime: { type: 'date', description: '출발시간' },
        arrivalTime: { type: 'date', description: '도착시간' },
        moveTime: { type: 'string', description: '이동시간 (1시간 30분이라면 1:30 형태로 전달합니다.)' }
      }
    }
  })
  @IsArray()
  flights: Array<{
    flightType: 'arrival' | 'departure';
    isLayover: boolean;
    flightName: string;
    company: string;
    seatRank: string;
    canChange: boolean;
    departureTime: string;
    arrivalTime: string;
    moveTime: string;
  }>;

  @ApiProperty({
    description: '상세 일정',
    required: true,
    type: 'array',
    items: {
      type: 'object',
      properties: {
        day: { type: 'number', description: '몇일차' },
        description: { type: 'string', description: '추가 설명' },
        details: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string', description: '종류' },
              content: { type: 'string', description: '내용 (내용과 라이브러리ID 중 하나만 사용)' },
              libraryId: { type: 'string', description: '라이브러리ID (내용과 라이브러리ID 중 하나만 사용)' }
            }
          }
        }
      }
    }
  })
  @IsArray()
  plans: Array<{
    day: number;
    description: string;
    details: Array<{
      type: string;
      content?: string;
      libraryId?: string;
    }>;
  }>;
}
