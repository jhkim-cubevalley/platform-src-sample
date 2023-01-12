import React from "react";
import {
  BigButton,
  reservationInfoI,
  StickyTitle,
} from "../../pages/reservation/package/[packageId]";
import { MyButton } from "../SmallButton";
import QM from "../../public/images/qm.svg";
import H_Separator from "../H_Separator";
import { useRouter } from "next/router";

const StickyMenu = (props: {
  info: reservationInfoI;
  onReservationClick: () => void;
  isBooked: boolean;
}) => {
  const { info, onReservationClick, isBooked } = props;
  const { adultNum, childNum, infantNum, eventData, productData } = info;
  const router = useRouter();
  // const { isBooked, toggleIsBooked } = props;
  const totalPrice =
    adultNum * productData.priceAdult +
    childNum * productData.priceTeen +
    infantNum * productData.priceKid +
    (adultNum + childNum + infantNum) * productData.fuelSurcharge;
  return (
    <div className="sticky top-[150px] hidden w-[420px]  flex-col rounded-[10px] bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] lg:flex lg:h-fit">
      <div className="flex flex-col gap-[50px] py-[40px] px-[24px]">
        <div className="flex items-center">
          <StickyTitle text="결제내역" />
          {/* <QM /> */}
        </div>

        <div className="flex flex-col gap-[28px] ">
          {adultNum !== 0 && (
            <div className="flex items-center justify-between ">
              <div className="flex flex-col gap-[5px]">
                <span className="m-0 font-['Pretendard'] text-[19px] font-normal leading-[22.6px] text-[#353535]">
                  성인 {adultNum}
                </span>
                <span className="m-0 font-['Pretendard'] text-[15px] font-medium leading-[18px] text-[#969696]">
                  {(
                    productData.priceAdult + productData.fuelSurcharge
                  ).toLocaleString("ko-KR")}{" "}
                  X {adultNum}명
                </span>
              </div>
              <div className="flex items-center">
                <span className="m-0 font-['Pretendard'] text-[23px] font-medium leading-[27.6px] text-[#353535]">
                  {(
                    (productData.priceAdult + productData.fuelSurcharge) *
                    adultNum
                  ).toLocaleString("ko-KR")}
                  원
                </span>
              </div>
            </div>
          )}

          {childNum !== 0 && (
            <div className="flex items-center justify-between ">
              <div className="flex flex-col gap-[5px]">
                <span className="m-0 font-['Pretendard'] text-[19px] font-normal leading-[22.6px] text-[#353535]">
                  아동 {childNum}
                </span>
                <span className="m-0 font-['Pretendard'] text-[15px] font-medium leading-[18px] text-[#969696]">
                  {(
                    productData.priceTeen + productData.fuelSurcharge
                  ).toLocaleString("ko-KR")}{" "}
                  X {childNum}명
                </span>
              </div>
              <div className="flex items-center">
                <span className="m-0 font-['Pretendard'] text-[23px] font-medium leading-[27.6px] text-[#353535]">
                  {(
                    (productData.priceTeen + productData.fuelSurcharge) *
                    childNum
                  ).toLocaleString("ko-KR")}
                  원
                </span>
              </div>
            </div>
          )}

          {infantNum !== 0 && (
            <div className="flex items-center justify-between ">
              <div className="flex flex-col gap-[5px]">
                <span className="m-0 font-['Pretendard'] text-[19px] font-normal leading-[22.6px] text-[#353535]">
                  유아 {infantNum}
                </span>
                <span className="m-0 font-['Pretendard'] text-[15px] font-medium leading-[18px] text-[#969696]">
                  {(
                    productData.priceKid + productData.fuelSurcharge
                  ).toLocaleString("ko-KR")}{" "}
                  X {infantNum}명
                </span>
              </div>
              <div className="flex items-center">
                <span className="m-0 font-['Pretendard'] text-[23px] font-medium leading-[27.6px] text-[#353535]">
                  {(
                    (productData.priceKid + productData.fuelSurcharge) *
                    infantNum
                  ).toLocaleString("ko-KR")}
                  원
                </span>
              </div>
            </div>
          )}

          {/* <div className="flex items-center justify-between ">
            <div className="flex gap-[9px]">
              <span className="m-0 font-['Pretendard'] text-[19px] font-normal leading-[22.6px] text-[#353535]">
                할인
              </span>
              <span className="m-0 font-['Pretendard'] text-[19px] font-normal leading-[22.6px] text-[#ff5c00]">
                쿠폰할인
              </span>
            </div>
            <div className="flex items-center">
              <span className="m-0 font-['Pretendard'] text-[23px] font-medium leading-[27.6px] text-[#353535]">
                400,000원
              </span>
            </div>
          </div> */}
        </div>
      </div>

      <H_Separator />

      <div className="flex flex-col gap-[25px] py-[40px] px-[24px]">
        <div className="gap- flex  items-center justify-between">
          <span className="m-0 whitespace-nowrap font-['Pretendard'] text-[20px] font-semibold leading-[23.9px] text-[#000000]">
            결제 금액
          </span>
          <span className="m-0 whitespace-nowrap font-['Pretendard'] text-[32px] font-bold leading-[38.2px] text-[#ff5c00]">
            {totalPrice.toLocaleString("ko-KR")}원
          </span>
        </div>
        {/* <div className="flex items-center justify-between">
          <span className="m-0 whitespace-nowrap font-['Pretendard'] text-[18.9px] font-normal leading-[22.6px] text-[#353535]">
            적립 포인트
          </span>
          <span className="m-0 whitespace-nowrap font-['Pretendard'] text-[23px] font-medium leading-[27px] text-[#353535]">
            2,000P
          </span>
        </div> */}
        {isBooked ? (
          <>
            {/* <div className="flex-ic w-full justify-between">
              <MyButton
                width="182px"
                height="64px"
                color="#00192f"
                radius="10px"
                temp
              >
                <span className="m-0 font-['Pretendard'] text-[22px] font-medium leading-[26.3px] text-[#ffffff]">
                  예약 수정
                </span>
              </MyButton>
              <div onClick={onReservationClick}>
                <MyButton
                  width="182px"
                  height="64px"
                  color="#e7e7e7"
                  radius="10px"
                  temp
                >
                  <span className="m-0 font-['Pretendard'] text-[22px] font-medium leading-[26.3px] text-[#2b2b2b]">
                    예약 취소
                  </span>
                </MyButton>
              </div>
            </div> */}
          </>
        ) : (
          <div
            onClick={() => {
              onReservationClick();
              // window.scrollTo(0, 0);
            }}
          >
            <BigButton text="예약하기" isOrange />
          </div>
        )}
      </div>
    </div>
  );
};

export default StickyMenu;
