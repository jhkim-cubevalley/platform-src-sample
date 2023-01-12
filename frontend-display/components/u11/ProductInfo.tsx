import React from "react";
import {
  Description,
  FlightInfo,
  getEndDate,
  reservationInfoI,
  SubTitle,
  Title,
} from "../../pages/reservation/package/[packageId]";
import { eachEventI } from "../../utils/api/event";
import { eachProductI } from "../../utils/api/product";
import { formatDate } from "../../utils/formatDate";

const ProductInfo = (props: { type: "package"; info: reservationInfoI }) => {
  const {
    type,
    info: { adultNum, childNum, infantNum, eventData, productData },
  } = props;
  console.log({ productInfo: props });

  const startDate = eventData.startDate;
  const endDate = getEndDate(startDate, eventData.product.tripDate - 1);

  return (
    <div className="flex flex-col gap-[25px] lg:gap-[45px]">
      <Title text="상품 정보" />
      <div className="flex-ic">
        <div className="flex-ic w-[30%]">
          <SubTitle text="상품명" />
        </div>
        <div className="flex-ic w-[100%]">
          <Description text={productData.name} semibold />
        </div>
      </div>
      <div className="flex-ic">
        <div className="flex-ic w-[30%]">
          <SubTitle text="상품코드" />
        </div>
        <div className="flex-ic w-[100%]">
          <Description text={eventData.code} />
        </div>
      </div>
      <div className="flex-ic">
        <div className="flex-ic w-[30%]">
          <SubTitle text="여행기간" />
        </div>
        <div className="flex-ic w-[100%]">
          <Description
            text={`${productData.tripNight}박 ${productData.tripDate}일`}
            semibold
          />
        </div>
      </div>
      {type === "package" && (
        <>
          <div className="flex">
            <div className="flex w-[30%]">
              <SubTitle text="여행일정" />
            </div>
            <div className="flex w-[100%] flex-col">
              <Description
                text={`${formatDate(startDate)} ~ ${formatDate(endDate || "")}`}
              />
            </div>
          </div>
          <FlightInfo info={productData.flight} />
        </>
      )}

      {/* 담당자 S*/}
      <div className="flex h-[69px] w-full gap-[33px] rounded-[10px] bg-[#e7e7e7] px-[16.5px] py-[16px] lg:items-center lg:justify-start lg:gap-[50px] lg:py-[27px] lg:pl-[31px] lg:pr-[97px]">
        <div className="flex gap-[29px] lg:gap-[55px] ">
          <SubTitle text="담당자" />
          <Description text="이담당" semibold />
        </div>
        <div className="lg:flex-ic flex flex-col gap-[9.5px] lg:flex-row lg:justify-between lg:gap-[64px]">
          <div className="flex lg:gap-[25px]">
            <Description text="전화" />
            <Description text="02-0000-0000" />
          </div>
          <div className="flex lg:gap-[25px]">
            <Description text="팩스" />
            <Description text="02-0000-0000" />
          </div>
        </div>
      </div>
      {/* 담당자 E*/}
    </div>
  );
};

export default ProductInfo;
