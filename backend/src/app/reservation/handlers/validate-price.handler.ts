import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import * as dayjs from 'dayjs';
import { ValidatePriceCommand } from '../commands/validate-price.command';
import { Error } from '../../../infrastructure/common/error';
import { CouponCode } from '../../coupon/domain/coupon-code.entity';
import { GetCouponByEachCodeQuery } from '../../coupon/queries/get-coupon-by-each-code.query';
import { GetCouponTransactionByUserQuery } from '../../coupon/queries/get-coupon-transaction-by-user.query';
import { CouponTransaction } from '../../coupon/domain/coupon-transaction.entity';

export interface AppliedPromotion {
  readonly promotionId: string;
  readonly price: number;
}

@Injectable()
@CommandHandler(ValidatePriceCommand)
export class ValidatePriceHandler implements ICommandHandler<ValidatePriceCommand> {
  constructor(private readonly queryBus: QueryBus) {}

  /**
   * 상품 예약 전 요청한 결제 금액과 실제 결제 금액이 같은지 검증합니다.
   * 유류할증료 적용 -> 포인트 검증 -> 쿠폰 검증 -> 인원별 금액 검증 -> 프로모션 검증 순으로 이루어집니다.
   * 실제 사용(포인트 차감, 쿠폰 사용)은 이곳에서 이루어지지 않습니다.
   */
  async execute({ data }: ValidatePriceCommand): Promise<AppliedPromotion[]> {
    const { userUid, event, people, price } = data;
    const point = data.extra.usePoint ?? 0;
    const havePoint = data.extra.havePoint ?? 0;

    if (havePoint - point < 0) throw new BadRequestException(Error.NOT_ENOUGH_POINT);
    let calculatePrice = (people.adult + people.teen + people.kid) * event.product.fuelSurcharge - point;

    const promised = data.extra.couponCodes.map(async (code) => {
      const coupon = await this.queryBus.execute<unknown, CouponCode | undefined>(new GetCouponByEachCodeQuery(code));
      if (!coupon) throw new NotFoundException(Error.NOT_FOUND_COUPON);
      const now = dayjs().startOf('day');
      const startDate = dayjs(coupon.coupon.dateFrom).startOf('day');
      const endDate = dayjs(coupon.coupon.dateTo).startOf('day');
      if (!coupon.coupon.isEnable || !(now >= startDate && now <= endDate)) {
        throw new BadRequestException(Error.CAN_NOT_USED_COUPON);
      }

      const isUseCoupon = await this.queryBus.execute<unknown, CouponTransaction | undefined>(
        new GetCouponTransactionByUserQuery(code, userUid)
      );
      if (isUseCoupon) throw new BadRequestException(Error.CAN_NOT_USED_COUPON);

      if (coupon.coupon.canDuplicate) {
        if (coupon.transactions.length >= coupon.coupon.amount) {
          throw new BadRequestException(Error.CAN_NOT_USED_COUPON);
        }
      } else if (coupon.transactions.length > 0) {
        throw new BadRequestException(Error.CAN_NOT_USED_COUPON);
      }
      calculatePrice -= coupon.coupon.salePrice;
    });
    await Promise.all(promised);

    calculatePrice += people.adult * event.product.priceAdult;
    calculatePrice += people.teen * event.product.priceTeen;
    calculatePrice += people.kid * event.product.priceKid;

    const promotions = [];
    if (event.product.promotionProducts?.length > 0) {
      const { promotion, value, isPercent } = event.product.promotionProducts[0];
      const now = dayjs().startOf('day');
      const startDate = dayjs(promotion.dateFrom).startOf('day');
      const endDate = dayjs(promotion.dateTo).startOf('day');

      if (promotion.isEnable && now >= startDate && now <= endDate) {
        let promotionPrice: number;
        if (isPercent) {
          promotionPrice = calculatePrice * (value / 100);
        } else {
          promotionPrice = value;
        }
        calculatePrice -= promotionPrice;

        promotions.push({
          promotionId: promotion.id,
          promotionPrice
        });
      }
    }

    if (calculatePrice !== price) throw new BadRequestException(Error.INVAILD_PRICE);

    return promotions;
  }
}
