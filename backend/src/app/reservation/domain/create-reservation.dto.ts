import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { ReservationReferrer } from './reservation.entity';
import SexType from '../../../infrastructure/common/types/sex-type';
import { CreateReservationPeopleInput } from '../commands/create-reservation.command';

export class CreateReservationDto {
  @ApiProperty({
    description: '행사ID',
    required: true
  })
  @IsNumber()
  eventId: number;

  @ApiProperty({
    description: '예약 경로',
    required: true,
    enum: ['inquiry', 'platform', 'incentive']
  })
  referrer: ReservationReferrer;

  @ApiProperty({
    description: '예약자 이름',
    required: true
  })
  @IsString()
  bookerName: string;

  @ApiProperty({
    description: '예약자 생년월일',
    example: '2022-01-01',
    required: true
  })
  @IsString()
  bookerBirthday: string;

  @ApiProperty({
    description: '예약자 성별',
    required: true,
    enum: ['M', 'F']
  })
  @IsString()
  bookerSex: SexType;

  @ApiProperty({
    description: '예약자 전화번호 (- 제외)',
    required: true
  })
  @IsString()
  bookerPhone: string;

  @ApiProperty({
    description: '예약자 이메일',
    required: true
  })
  @IsEmail()
  bookerEmail: string;

  @ApiProperty({
    description: '동반자 정보',
    required: true,
    type: 'array',
    items: {
      type: 'object',
      properties: {
        isMaster: { type: 'boolean', description: '대표자 여부' },
        type: { type: 'string', description: '나이 종류 (성인, 아동, 유아)', enum: ['adult', 'teen', 'kid'] },
        name: { type: 'string', description: '이름' },
        sex: { type: 'string', description: '성별', enum: ['M', 'F'] },
        phone: { type: 'string', description: '전화번호' },
        birthday: { type: 'string', description: '생년월일', example: '2022-01-01' },
        email: { type: 'string', description: '이메일' },
        passport: {
          type: 'object',
          description: '여권 정보 (해외 여행 시에만 전달합니다.)',
          nullable: true,
          properties: {
            birthday: { type: 'string', description: '생년월일', example: '2022-01-01' },
            country: { type: 'string', description: '국적' },
            issue: { type: 'string', description: '발행국' },
            passportNumber: { type: 'string', description: '여권번호' },
            passportExpire: { type: 'string', description: '여권만료일', example: '2022-01-01' }
          }
        }
      }
    }
  })
  @IsArray()
  people: Array<CreateReservationPeopleInput>;

  @ApiProperty({
    description: '사용 포인트 (서버와 교차 검증이 진행됩니다.)',
    default: 0,
    required: false
  })
  @IsNumber()
  point: number;

  @ApiProperty({
    description: '사용 쿠폰코드들 (서버와 교차 검증이 진행됩니다.)',
    required: false
  })
  @IsArray()
  @IsOptional()
  couponCodes?: string[];

  @ApiProperty({
    description: '최종 결제 가격 (서버와 교차 검증이 진행됩니다.)',
    required: true
  })
  @IsNumber()
  price: number;
}
