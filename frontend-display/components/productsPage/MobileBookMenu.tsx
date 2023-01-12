import React from "react";
import CalendarSvg from "../../public/images/calendar-mobile.svg";
import { useRouter } from "next/router";

const MobileBookMenu = (props: any) => {
  const {
    data,
    adultNum,
    childNum,
    infantNum,
    totalPeopleNum,
    setAdultNum,
    setChildNum,
    setInfantNum,
    setTotalPeopleNum,
    adultPrice,
    childPrice,
    infantPrice,
    setAdultPrice,
    setChildPrice,
    setInfantPrice,
    totalPrice,
  } = props;

  const router = useRouter();

  return (
    <div className="flex w-full border-[0.5px] border-[#cfcfcf] bg-[#fafafa] px-[20px] py-[20px]  shadow-[0px_-2px_15px_rgba(0,0,0,0.06)] lg:hidden">
      <div className="flex w-full flex-col gap-[7px]">
        <div>
          <h1 className="m-0 font-['Pretendard'] text-[20px] font-bold leading-[23.9px] text-[#010101]">
            3,000,000원
          </h1>
        </div>
        <div className="flex-ic gap-[9px]">
          <CalendarSvg />
          <span className="m-0 font-['Pretendard'] text-[14px] font-semibold leading-[16.7px] text-[#353535]">
            08.09 (화)
          </span>
          <span className="m-0 font-['Pretendard'] text-[14px] font-semibold leading-[16.7px] text-[#ff5c00]">
            출발
          </span>
        </div>
      </div>

      <div
        className="flex-center w-full cursor-pointer rounded-[7px] bg-[#00192f] py-[13.5px]"
        onClick={() =>
          router.push({
            pathname: `/reservation/package/${router.query.productid}`,
            query: {
              adultNum,
              childNum,
              infantNum,
              adultPrice,
              childPrice,
              infantPrice,
              totalPrice,
              productName: data.name,
              productCode: data.code,
              productLong: `${data.tripNight}박 ${data.tripDate}일`,
              flightCompany: data.flight.company,
              fuelSurcharge: data.fuelSurcharge,
            },
          })
        }
      >
        <span className="m-0 font-['Pretendard'] text-[16px] font-medium leading-[19.1px] text-[#ffffff]">
          예약하기
        </span>
      </div>
    </div>
  );
};

export default MobileBookMenu;
