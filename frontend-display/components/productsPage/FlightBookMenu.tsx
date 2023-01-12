import React, { useState, useEffect } from "react";
import Qm from "../../public/images/qm.svg";
import MinusGray from "../../public/images/minusGray.svg";
import MinusBlack from "../../public/images/minusBlack.svg";
import PlusBlack from "../../public/images/plusBlack.svg";
import PlusGray from "../../public/images/plusGray.svg";
import Bookmark from "../../public/images/bookmark.svg";
import H_Separator from "../H_Separator";
import { useRouter } from "next/router";
import { eachEventI } from "../../utils/api/event";
import { dateToString, getDay } from "../../utils/formatDate";

const getLittleDate = (date?: string) => {
  return date ? date.substring(5, 10).replace("-", ".") : "미지정";
};

export const addDate = (dateObj: Date, dateToAdd: number) => {
  const nowDate = dateObj.getDate();
  dateObj.setDate(nowDate + dateToAdd);
  return dateObj;
};

const FlightBookMenu = (props: any) => {
  const router = useRouter();
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
    eventData,
  } = props;
  const {
    query: { productid, event = null },
  } = router;
  const { priceAdult, priceTeen, priceKid, maxPeople, minPeople } = data;
  const [isTooManyPeople, setIsTooManyPeople] = useState(false);
  const [koreanDay, setKoreanDay] = useState("");
  const startDate = eventData ? (eventData as eachEventI).startDate : null;
  const endDate = eventData
    ? dateToString(
        addDate(
          new Date((eventData as eachEventI).startDate),
          (eventData as eachEventI).product.tripDate - 1
        )
      )
    : null;
  const dateFrom = data.dateFrom
    ? data.dateFrom.substring(5, 10).replace("-", ".")
    : "미지정"; //08.09
  const [dateFromDay, setDateFromDay] = useState("");
  const dateTo = data.dateTo
    ? data.dateTo.substring(5, 10).replace("-", ".")
    : "미지정"; //08.09
  const [dateToDay, setDateToDay] = useState("");

  useEffect(() => {
    const getDay = (dayIndex: any) => {
      const dayArr = ["일", "월", "화", "수", "목", "금", "토"];
      const day = dayArr[dayIndex];
      return day;
    };
    setDateFromDay(getDay(new Date(data.dateFrom).getDay()));
    setDateToDay(getDay(new Date(data.dateTo).getDay()));
  }, []);

  const handleAdultPlus = () => {
    if (isTooManyPeople) {
      window.alert("최대 인원을 초과했습니다.");
      return;
    }
    setAdultNum((prev: any) => prev + 1);
  };

  const handleAdultMinus = () => {
    if (adultNum <= 0) return;
    setAdultNum((prev: any) => prev - 1);
  };

  const handleChildPlus = () => {
    if (isTooManyPeople) {
      window.alert("최대 인원을 초과했습니다.");
      return;
    }
    setChildNum((prev: any) => prev + 1);
  };

  const handleChildMinus = () => {
    if (childNum <= 0) return;
    setChildNum((prev: any) => prev - 1);
  };

  const handleInfantPlus = () => {
    if (isTooManyPeople) {
      window.alert("최대 인원을 초과했습니다.");
      return;
    }
    setInfantNum((prev: any) => prev + 1);
  };

  const handleInfantMinus = () => {
    if (infantNum <= 0) return;
    setInfantNum((prev: any) => prev - 1);
  };

  useEffect(() => {
    setAdultPrice(adultNum * (priceAdult + data.fuelSurcharge));
  }, [adultNum]);

  useEffect(() => {
    setChildPrice(childNum * (priceTeen + data.fuelSurcharge));
  }, [childNum]);

  useEffect(() => {
    setInfantPrice(infantNum * (priceKid + data.fuelSurcharge));
  }, [infantNum]);

  useEffect(() => {
    setTotalPeopleNum(adultNum + childNum + infantNum);
  }, [adultNum, childNum, infantNum, totalPeopleNum]);

  useEffect(() => {
    if (totalPeopleNum >= maxPeople) {
      setIsTooManyPeople(true);
    } else {
      setIsTooManyPeople(false);
    }
  }, [totalPeopleNum]);

  return (
    <div className="flight-book-box sticky top-0 right-0 flex h-fit w-full max-w-[420px] flex-col bg-[#fafafa] px-[23px]  pb-[30.5px] pt-[34.35px] shadow-[0px_2.35px_10.5px_rgba(0,0,0,0.09)]">
      <span className="mb-6 font-['Pretendard'] text-[15px] font-normal leading-[18px] text-[#727272]">
        상품코드: {eventData ? (eventData as eachEventI).code : data.code}
      </span>
      {eventData ? (
        <div className="flight-book-schedule mb-6 flex flex-col border-[1.2px] border-solid border-[#eaeaea]  ">
          <div className="flight-book-schedule-time box-border flex items-center justify-between border-b border-[#eaeaea] px-[30px] pt-[23px] pb-[22px]">
            <div className="text-[#] flex flex-col font-['Pretendard'] text-[20px] font-semibold leading-[23.87px]">
              <span>{`${getLittleDate(startDate || "")} (${getDay(
                startDate || ""
              )})`}</span>
              {/* <span>10:00</span> */}
            </div>
            <div className="flex rounded-[5px] border border-[#ababab] p-[4px_8px]">
              <span className="font-['Pretendard'] text-[16px] font-medium leading-[23.17px] text-[#00192f]">
                {`${data.tripNight}박 ${data.tripDate}일`}
              </span>
            </div>
            <div className="text-[#] flex flex-col font-['Pretendard'] text-[20px] font-semibold leading-[23.87px]">
              <span>{`${getLittleDate(endDate || "")} (${getDay(
                endDate || ""
              )})`}</span>
              {/* <span>10:00</span> */}
            </div>
          </div>
          <div className="flight-book-schedule-change flex items-center justify-center py-[17.65px] font-['Pretendard'] text-[20px] font-medium leading-[23.87px] text-[#00192f]">
            <span>출발일 변경</span>
          </div>
        </div>
      ) : (
        <div className="w-full py-4 text-center text-xl font-bold">
          {event === null ? "예약가능한 일정이 없습니다." : "로딩중"}
        </div>
      )}

      <div className="flight-book-count relative mb-8 flex flex-col gap-6 ">
        <div className="flight-book-count__row flex justify-between ">
          {/* <div className="flight-book-count__iconsbox relative">
            <Qm className="absolute top-[4.9px] left-[6.55px]" />
          </div> */}
          <div></div>
          <span className="text-[15px] font-normal leading-[18px] text-[#bbbbbb] ">
            {`* 유류할증료 ${data.fuelSurcharge.toLocaleString()}원 포함`}
          </span>
        </div>
        <div className="flight-book-count-person flex  justify-between">
          <div className="flight-book-count-person__who flex items-center gap-6 ">
            <span className="font-['Pretendard'] text-[19px] font-normal leading-[23px] text-[#353535]">
              성인
            </span>
            <div className="flex items-center gap-4">
              <div onClick={handleAdultMinus}>
                {adultNum === 0 ? (
                  <MinusGrayComponent />
                ) : (
                  <MinusBlackComponent />
                )}
              </div>
              <span className="font-['Pretendard'] text-[23px] font-normal leading-[28px] text-[#353535]">
                {adultNum}
              </span>
              <div onClick={handleAdultPlus}>
                {isTooManyPeople ? (
                  <PlusGrayComponent />
                ) : (
                  <PlusBlackComponent />
                )}
              </div>
            </div>
          </div>
          <div className="flight-book-count-person__money">
            <span className="m-0 font-['Pretendard'] text-[23.15px] font-medium leading-[27.62px] text-[#353535]">{`x ${(
              priceAdult + data.fuelSurcharge
            ).toLocaleString("ko-KR")}원`}</span>
          </div>
        </div>
        <div className="flight-book-count-person flex  justify-between">
          <div className="flight-book-count-person__who flex items-center gap-6">
            <span className="font-['Pretendard'] text-[19px] font-normal leading-[23px] text-[#353535]">
              아동
            </span>
            <div className="flex items-center gap-4">
              <div onClick={handleChildMinus}>
                {childNum === 0 ? (
                  <MinusGrayComponent />
                ) : (
                  <MinusBlackComponent />
                )}
              </div>
              <span className="font-['Pretendard'] text-[23px] font-normal leading-[28px] text-[#353535]">
                {childNum}
              </span>
              <div onClick={handleChildPlus}>
                {isTooManyPeople ? (
                  <PlusGrayComponent />
                ) : (
                  <PlusBlackComponent />
                )}
              </div>
            </div>
          </div>
          <div className="flight-book-count-person__money">
            <span className="m-0 font-['Pretendard'] text-[23.15px] font-medium leading-[27.62px] text-[#353535]">{`x ${(
              priceTeen + data.fuelSurcharge
            ).toLocaleString("ko-KR")}원`}</span>
          </div>
        </div>
        <div className="flight-book-count-person flex  justify-between">
          <div className="flight-book-count-person__who flex items-center gap-6">
            <span className="font-['Pretendard'] text-[19px] font-normal leading-[23px] text-[#353535]">
              유아
            </span>
            <div className="flex items-center gap-4">
              <div onClick={handleInfantMinus}>
                {infantNum === 0 ? (
                  <MinusGrayComponent />
                ) : (
                  <MinusBlackComponent />
                )}
              </div>
              <span className="font-['Pretendard'] text-[23px] font-normal leading-[28px] text-[#353535]">
                {infantNum}
              </span>
              <div onClick={handleInfantPlus}>
                {isTooManyPeople ? (
                  <PlusGrayComponent />
                ) : (
                  <PlusBlackComponent />
                )}
              </div>
            </div>
          </div>
          <div className="flight-book-count-person__money">
            <span className="m-0 font-['Pretendard'] text-[23.15px] font-medium leading-[27.62px] text-[#353535]">{`x ${(
              priceKid + data.fuelSurcharge
            ).toLocaleString("ko-KR")}원`}</span>
          </div>
        </div>
      </div>

      <H_Separator />

      <div className="flight-book-final mt-7 flex flex-col gap-10 ">
        <div className="flight-book-final-price flex items-center justify-between">
          <span className="font-['Pretendard'] text-[20px] font-medium leading-[23.87px] text-[#000000]">
            총 금액
          </span>
          <span className="font-['Pretendard'] text-[32px] font-bold leading-[38px] text-[#ff5c00]">
            {totalPrice.toLocaleString("ko-KR")}원
          </span>
        </div>
        <div className="flight-book-final-buttons flex items-center gap-4">
          <div className="box-border flex h-[63.7px] w-[76px] items-center justify-center rounded-[10px] bg-[#ededed]">
            <Bookmark width="26px" height="38px" className="cursor-pointer" />
          </div>
          <div
            className="box-border flex h-[63.7px] w-[284px] cursor-pointer items-center justify-center rounded-[10px] bg-[#00192f]"
            onClick={() => {
              if (!eventData) return;
              if (totalPeopleNum === 0) {
                window.alert("1명 이상 선택해야합니다.");
                return;
              }
              router.push({
                pathname: `/reservation/package/${router.query.productid}`,
                query: {
                  adultNum,
                  childNum,
                  infantNum,
                  event,
                },
              });
            }}
          >
            <span className="text-[22px] font-medium leading-[26px] text-[#ffffff]">
              {eventData ? "예약하기" : "예약불가"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const MinusGrayComponent = () => {
  return (
    <MinusGray width="25.22px" height="25.22px" className="cursor-pointer" />
  );
};
const MinusBlackComponent = () => {
  return (
    <MinusBlack width="25.22px" height="25.22px" className="cursor-pointer" />
  );
};
const PlusBlackComponent = () => {
  return (
    <PlusBlack width="25.22px" height="25.22px" className="cursor-pointer" />
  );
};

const PlusGrayComponent = () => {
  return (
    <PlusGray width="25.22px" height="25.22px" className="cursor-pointer" />
  );
};

export default FlightBookMenu;
