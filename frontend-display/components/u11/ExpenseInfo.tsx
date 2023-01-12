import React from "react";
import {
  FormLabel,
  Title,
  Warning,
  SmallButton,
  reservationInfoI,
} from "../../pages/reservation/package/[packageId]";
import H_Separator from "../H_Separator";
import Grid from "./Grid";

const ExpenseInfo = (props: { info: reservationInfoI; type?: "package" }) => {
  const { info, type } = props;
  const { adultNum, childNum, infantNum, eventData, productData } = info;
  const totalPrice =
    adultNum * productData.priceAdult +
    childNum * productData.priceTeen +
    infantNum * productData.priceKid +
    (adultNum + childNum + infantNum) * productData.fuelSurcharge;
  return (
    <div className="flex flex-col">
      <div>
        <Title text="경비 내역" size={15} />
      </div>
      <div className="mt-[24px]">
        <Warning
          text="본 상품 가격에는 “항공운임 등 총액(항공권)”이 포함되어 있는 가격이며 유류할증료와 제세공과금은 발권일기준 유가와 환율에 따라 수이 요금 변동될 수 있습니다.)
"
        />
      </div>
      <div className="mt-[30px] hidden lg:block">
        <Grid type={type} info={info} />
      </div>
      <div className="mt-4 flex w-full flex-col gap-2 lg:hidden">
        <div className="text-[#714141417171] m-0 font-['Pretendard'] text-[12px] font-bold">
          상품 금액
        </div>
        {(
          [
            {
              name: "성인",
              price: productData.priceAdult,
              fuel: productData.fuelSurcharge,
              num: adultNum,
            },
            {
              name: "아동",
              price: productData.priceTeen,
              fuel: productData.fuelSurcharge,
              num: childNum,
            },
            {
              name: "유아",
              price: productData.priceKid,
              fuel: productData.fuelSurcharge,
              num: infantNum,
            },
          ] as { name: string; price: number; fuel: number; num: number }[]
        ).map(({ name, price, fuel, num }, i) => (
          <div key={i} className="flex w-full items-center justify-between">
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center justify-start gap-1">
                <div className="text-[12px] font-bold text-[#414141]">
                  {name}
                </div>
                <div className="text-[12px] text-[#353535]">{num}</div>
              </div>
              <div className="text-[9px] text-[#7E7E7E]">
                {`기본상품가 ${price.toLocaleString()}원 + 유류할증료 ${fuel.toLocaleString()}원`}
              </div>
            </div>
            <div className="text-[13px] font-bold text-[#7E7E7E]">
              {((price + fuel) * num).toLocaleString()}원
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[17px] flex items-center justify-between lg:mt-[40px]">
        <span className="text-[#714141417171] m-0 font-['Pretendard'] text-[12px] font-bold leading-[14px] lg:text-[24px] lg:leading-[28.6px]">
          총 금액
        </span>
        <span className="text-[#714141417171] m-0 font-['Pretendard'] text-[13.2px] font-semibold leading-[16px] lg:text-[24px] lg:leading-[28.6px]">
          {totalPrice.toLocaleString()}원
        </span>
      </div>

      <div className="mt-[37px] mb-[21px]">
        <H_Separator />
      </div>

      {/* <div className="flex flex-col gap-[20px] lg:gap-[43px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[12px] lg:gap-[27px]">
            <FormLabel text="쿠폰" />
            <div
              className="flex-center"
              // onClick={() => toggleShowCouponModal()}
            >
              <SmallButton text="쿠폰선택하기" />
            </div>
            <span className="m-0 font-['Pretendard'] text-[10px] font-medium  leading-[12px] text-[#ff5c00] lg:text-[18px] lg:leading-[21.5px] ">
              {selectedCoupon ? `${selectedCoupon}` : "적용된 쿠폰 없음"}
            </span>
          </div>
          <div>
            <span className="m-0 font-['Pretendard'] text-[13.25px] font-normal leading-[15.8px] text-[#7e7e7e] lg:text-[24px] lg:leading-[29px]">
              -200,000원
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <FormLabel text="포인트(사용가능:2000P)" />
          <span className="m-0 font-['Pretendard'] text-[13.25px] font-normal leading-[15.8px] text-[#7e7e7e] lg:text-[24px] lg:leading-[29px]">
            -0원
          </span>
        </div>
        <div className="flex items-center justify-between">
          <FormLabel text="할인" />
          <span className="m-0 font-['Pretendard'] text-[13.25px] font-normal leading-[15.8px] text-[#7e7e7e] lg:text-[24px] lg:leading-[29px]">
            -200,000원
          </span>
        </div>
      </div> */}
      {/* <div className="my-[17px] lg:my-[37px]">
        <H_Separator />
      </div> */}

      <div className="flex items-center justify-between">
        <h1 className="m-0 font-['Pretendard'] text-[14px] font-bold leading-[16.7px] text-[#00192f] lg:text-[30px] lg:leading-[35.8px]">
          결제 금액
        </h1>
        <h1 className="m-0 font-['Pretendard'] text-[16.6px] font-bold leading-[19.76px] text-[#ff5c00] lg:text-[30px] lg:leading-[35.8px]">
          {totalPrice.toLocaleString()}원
        </h1>
      </div>
    </div>
  );
};

export default ExpenseInfo;
