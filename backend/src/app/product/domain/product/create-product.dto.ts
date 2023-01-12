import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: '인센티브용 여행 여부 (일반 여행상품은 해당 옵션을 사용하지 않습니다.)',
    required: false
  })
  @IsBoolean()
  @IsOptional()
  isForIncentive?: boolean;

  @ApiProperty({
    description: '상품명(한글)',
    required: true
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '상품명(영문)',
    required: true
  })
  @IsString()
  nameEn: string;

  @ApiProperty({
    description: '유류할증료',
    required: false
  })
  @IsNumber()
  @IsOptional()
  fuelSurcharge?: number;

  @ApiProperty({
    description: '성인 가격',
    required: false
  })
  @IsNumber()
  @IsOptional()
  priceAdult?: number;

  @ApiProperty({
    description: '아동 가격',
    required: false
  })
  @IsNumber()
  @IsOptional()
  priceTeen?: number;

  @ApiProperty({
    description: '유아 가격',
    required: false
  })
  @IsNumber()
  @IsOptional()
  priceKid?: number;

  @ApiProperty({
    description: '가격 대체텍스트',
    required: false
  })
  @IsString()
  @IsOptional()
  priceText?: string;

  @ApiProperty({
    description: '최소 출발인원',
    required: false
  })
  @IsNumber()
  @IsOptional()
  minPeople?: number;

  @ApiProperty({
    description: '최대 출발인원',
    required: false
  })
  @IsNumber()
  @IsOptional()
  maxPeople?: number;

  @ApiProperty({
    description: '출발지',
    required: false
  })
  @IsString()
  @IsOptional()
  departure?: string;

  @ApiProperty({
    description: '기간 시작일 (예: 2022-10-01)',
    required: false
  })
  @IsString()
  @IsOptional()
  dateFrom?: string;

  @ApiProperty({
    description: '기간 종료일 (예: 2022-10-01)',
    required: false
  })
  @IsString()
  @IsOptional()
  dateTo?: string;

  @ApiProperty({
    description: '출발주기 (요일 숫자를 띄어쓰기 없이 콤마로 구분합니다. 0: 일요일, 6: 토요일)',
    required: false
  })
  @IsString()
  @IsOptional()
  departurePeriod?: string;

  @ApiProperty({
    description: '상품마감일',
    required: false
  })
  @IsNumber()
  @IsOptional()
  endDay?: number;

  @ApiProperty({
    description: '상품개요',
    required: false
  })
  @IsString()
  @Length(0, 1000)
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: '상품 특장점 (콤마로 구분합니다.)',
    required: false
  })
  @IsString()
  @IsOptional()
  pros?: string;

  @ApiProperty({
    description: '지역 (지역, 국가, 도시 UUID)',
    required: true,
    type: 'array',
    items: {
      type: 'object',
      properties: {
        regionOne: { type: 'string' },
        regionTwo: { type: 'string' },
        regionThree: { type: 'string' }
      }
    }
  })
  @IsArray()
  regions: Array<{
    regionOne: string;
    regionTwo: string;
    regionThree: string;
  }>;

  @ApiProperty({
    description: '카테고리 (대, 중, 소분류 UUID)',
    required: false,
    type: 'array',
    items: {
      type: 'object',
      properties: {
        categoryOne: { type: 'string' },
        categoryTwo: { type: 'string', nullable: true },
        categoryThree: { type: 'string', nullable: true }
      }
    }
  })
  @IsArray()
  @IsOptional()
  categories?: Array<{
    categoryOne: string;
    categoryTwo?: string;
    categoryThree?: string;
  }>;

  @ApiProperty({
    description: '태그 (띄어쓰기 없이 콤마로 구분합니다.)',
    required: false
  })
  @IsString()
  @IsOptional()
  tag?: string;

  @ApiProperty({
    description: '매니지먼트 사용여부',
    required: true,
    default: false
  })
  @IsBoolean()
  isManagement: boolean;

  @ApiProperty({
    description: '매니지먼트 종류 (띄어쓰기 없이 콤마로 구분합니다.)',
    required: false
  })
  @IsString()
  @IsOptional()
  managementType?: string;

  @ApiProperty({
    description: '기타 요청사항',
    required: false
  })
  @IsString()
  @IsOptional()
  moreMessage?: string;

  @ApiProperty({
    description: '담당그룹 UUID',
    required: false
  })
  @IsUUID()
  @IsOptional()
  manageGroupId?: string;

  @ApiProperty({
    description: '항공편 데이터',
    required: false,
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
        departureTime: { type: 'string', description: '출발시간 (시:분:초 형식. 14:15:00)' },
        arrivalTime: { type: 'string', description: '도착시간 (시:분:초 형식. 15:45:00)' },
        moveTime: { type: 'string', description: '이동시간 (1시간 30분이라면 1:30 형태로 전달합니다.)' }
      }
    }
  })
  @IsArray()
  @IsOptional()
  flights?: Array<{
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
    description: '상세 내용',
    required: false
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({
    description: '일정 몇박',
    required: false
  })
  @IsNumber()
  @IsOptional()
  tripNight?: number;

  @ApiProperty({
    description: '일정 몇일',
    required: false
  })
  @IsNumber()
  @IsOptional()
  tripDate?: number;

  @ApiProperty({
    description: '상세 일정',
    required: false,
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
  @IsOptional()
  plans?: Array<{
    day: number;
    description: string;
    details: Array<{
      type: string;
      content?: string;
      libraryId?: string;
    }>;
  }>;

  @ApiProperty({
    description: '참조 정보',
    required: false,
    type: 'array',
    items: {
      type: 'object',
      properties: {
        type: { type: 'string', description: '참조 종류. 포함, 불포함 (in, notin)', enum: ['in', 'notin'] },
        title: { type: 'string', description: '제목' },
        description: { type: 'string', description: '설명' }
      }
    }
  })
  @IsArray()
  @IsOptional()
  notes?: Array<{
    readonly type: 'in' | 'notin';
    readonly title: string;
    readonly description: string;
  }>;

  @ApiProperty({
    description: '기타 참고사항',
    required: false
  })
  @IsString()
  @IsOptional()
  moreNote?: string;

  @ApiProperty({
    description: '유의사항',
    required: false
  })
  @IsString()
  @IsOptional()
  caution?: string;

  @ApiProperty({
    description: '환불규정',
    required: false
  })
  @IsString()
  @IsOptional()
  refund?: string;

  @ApiProperty({
    description: '상품 상태. (임시 저장, 승인요청 / temp, request_approve)',
    required: true,
    enum: ['temp', 'request_approve']
  })
  @IsString()
  status: 'temp' | 'request_approve';

  @ApiProperty({
    description: '승인 요청 메시지 (임시 저장 상태라면 사용하지 않습니다.)',
    required: false
  })
  @IsOptional()
  @IsString()
  requestMessage?: string;

  @ApiProperty({
    description: '약관 정보 UUID 배열',
    required: false,
    type: 'array',
    items: {
      type: 'string'
    }
  })
  @IsArray()
  @IsOptional()
  tos?: string[];

  @ApiProperty({
    description: '상품 이미지 정보',
    required: false,
    type: 'array',
    items: {
      type: 'object',
      properties: {
        url: { type: 'string', description: '이미지 주소' },
        isThumb: { type: 'boolean', description: '대표이미지 여부' }
      }
    }
  })
  @IsArray()
  @IsOptional()
  images?: Array<{
    readonly url: string;
    readonly isThumb: boolean;
  }>;
}
