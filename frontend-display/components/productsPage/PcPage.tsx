import React, { useEffect, useState } from "react";
import { useContext } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import ChevronRight from "../../public/images/chevron-right.svg";
import ChevronRightGray from "../../public/images/chevron-right-gray.svg";
import ChevronLeftGray from "../../public/images/chevron-left-gray.svg";
import Location from "../../public/images/location.svg";
import Person from "../../public/images/person.svg";
import Leaf from "../../public/images/leaf.svg";
import CalendarIcon from "../../public/images/calendar.svg";
import Departure from "../../public/images/plane_departure.svg";
import Arrival from "../../public/images/plane_arrival.svg";
import PageCategory from "../PageCategory";
import Test from "../Test";
import CubeezOtherProducts from "./CubeezOtherProducts";
import H_Separator from "../H_Separator";
import ProfileCircleDiv from "../ProfileCircleDiv";
import PhotoAlbum from "./PhotoAlbum";
import { UserContext } from "../../contexts/UserStore";
import FlightBookMenu from "./FlightBookMenu";
import "react-datepicker/dist/react-datepicker.css";
import { FlightGraph } from "../FlightGraph";
import { useRouter } from "next/router";
import { eachEventI } from "../../utils/api/event";
import { compareDate, getDay } from "../../utils/formatDate";

registerLocale("ko", ko);

const PcPage = (props: any) => {
  const context = useContext(UserContext);
  const { startDate, setStartDate } = context;
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
    flightInfo,
    eventData,
  } = props;
  const [prosArr, setProsArr] = useState([""]);
  const router = useRouter();
  const {
    query: { productid, event = null },
  } = router;
  const eventList = data?.events
    ? [...data.events]
        .filter((t) => t.status === "display")
        .sort((a: any, b: any) => compareDate(a.startDate, b.startDate))
    : [];
  const [EventStartIndex, setEventStartIndex] = useState(0);
  const changeEventStartIndex = (diff: number) => {
    setEventStartIndex((now) => {
      const target = now + diff;
      const eventLength = eventList.length;
      if (eventLength - target >= 5 && target > 0) return target;
      return now;
    });
  };
  useEffect(() => {
    const tempArr = data.pros.split(",");
    setProsArr([...tempArr]);
  }, [data]);
  const hashtagList = data && "tag" in data && data.tag.split(",");
  return (
    <div className="hidden w-full flex-col items-center justify-start px-[300px] lg:flex">
      <div>
        <PhotoAlbum data={data} />
      </div>
      <div className="flight-book-toppest-box relative flex w-full justify-center gap-[30px] pt-[40px]">
        <div className="w- flex flex-col">
          {data?.cubeez && (
            <>
              <div className="flex items-center gap-5">
                <ProfileCircleDiv url={data?.cubeez?.profileUrl} index={1} />
                <div className="flex flex-col">
                  <div className="flex items-center gap-[10px]">
                    <span className="font-['Pretendard'] text-[23px] font-semibold leading-8">
                      {data?.cubeez?.name
                        ? data?.cubeez?.name
                        : "알 수 없는 큐비즈"}
                    </span>
                    <ChevronRight />
                  </div>
                  {/* <span className="font-['Pretendard'] text-[18px] font-normal leading-[32px] text-[#838383]">
                    후기 500 | 팬 1,890
                  </span> */}
                </div>
              </div>
              <div className="mt-8 mb-[15px]">
                <H_Separator />
              </div>
            </>
          )}

          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="button-box flex gap-[13px]">
                {[{ ...data?.category[0]?.categoryThree }].map(
                  (category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center rounded-md bg-[#f0f0f0] py-[7px] px-[15px]"
                    >
                      <span className="font-['Pretendard'] text-[18px] font-medium leading-[21px] text-[#ff5c00]">
                        {category.nameKo}
                      </span>
                    </div>
                  )
                )}
                {hashtagList.map((t: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-center rounded-md bg-[#f0f0f0] py-[7px] px-[15px]"
                  >
                    <span className="font-['Pretendard'] text-[18px] font-medium leading-[21px]">
                      {t}
                    </span>
                  </div>
                ))}
              </div>
              {/* <div className="flex">
                <div className="flex items-center justify-center rounded-[6px] border border-[#000000] px-[6.2px] py-[12.6px]">
                  <span className="text-[17px] font-semibold leading-[20px]">
                    여행상품 핵심정보
                  </span>
                </div>
              </div> */}
            </div>

            <div className="productInfo mt-[30px] flex flex-col">
              <div className="productInfo-LocaPerson mb-[38px] flex flex-col gap-[18px]">
                <div className="produtcInfo-location flex gap-[10.5px]">
                  <Location />
                  <span className="font-['Pretendard'] text-[18px] font-normal leading-[21px] text-[#464646]">
                    {`${data?.region[0]?.regionOne?.name}${
                      data?.region[0]?.regionTwo?.name === undefined || null
                        ? ""
                        : `, ${data?.region[0]?.regionTwo?.name}`
                    }${
                      data?.region[0]?.regionThree?.name === undefined || null
                        ? ""
                        : `, ${data?.region[0]?.regionThree?.name}`
                    }${
                      data?.region[0]?.regionFour?.name === undefined || null
                        ? ""
                        : `, ${data?.region[0]?.regionTwo?.name}`
                    }`}
                  </span>
                </div>
                <div className="produtcInfo-personInfo flex gap-[10.5px]">
                  <Person />
                  <span className="font-['Pretendard'] text-[18px] font-normal leading-[21px] text-[#464646]">
                    현재 예약 3명 !api
                  </span>
                  <span className="font-['Pretendard'] text-[18px] font-normal leading-[21px] text-[#838383]">
                    |
                  </span>
                  <span className="font-['Pretendard'] text-[18px] font-normal leading-[21px] text-[#9f9f9f]">
                    {`최소출발 ${data?.minPeople}명 최대출발 ${data?.maxPeople}명`}
                  </span>
                </div>
              </div>

              <div className="productInfo-description mb-8 flex flex-col whitespace-pre-wrap">
                <span className="font-['Pretendard'] text-[20px] font-normal leading-[36px] text-[#000000]">
                  {data?.description}
                </span>
              </div>

              <div className="flex flex-col gap-[27.86px]">
                {prosArr &&
                  prosArr.map((item: any, index: any) => (
                    <div
                      key={index}
                      className="productInfo-point flex flex-col gap-7"
                    >
                      <div className="productInfo-point__item flex gap-[13.2px] ">
                        <Leaf />
                        <span className="font-['Pretendard'] text-[20px] font-medium leading-[24px] text-[#00192f]">
                          {item}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flightInfo mt-[85.75px] flex flex-col">
              <div className="flightInfo-departure flex flex-col gap-[28.5px]">
                <h1 className="flight-info-title">출발일</h1>
                {/* <div className="flex-ic justify-between">
                  <div className="flex-ic ">
                    <span className="m-0 font-['Pretendard'] text-[28px] font-medium leading-[33.4px] text-[#383838] ">
                      {String(startDate)}
                    </span>
                  </div>

                  <DatePicker
                    onChange={(date) => setStartDate(date)}
                    locale={ko}
                    withPortal
                    customInput={
                      <div>
                        <CalendarIcon />
                      </div>
                    }
                  />
                </div> */}
                <div className="flex-ic justify-between">
                  <div
                    className="cursor-pointer"
                    onClick={() => changeEventStartIndex(-1)}
                  >
                    <ChevronLeftGray />
                  </div>
                  {event === null ? (
                    <div className="w-full text-center text-xl font-bold">
                      예약 가능한 일정이 없습니다.
                    </div>
                  ) : (
                    eventList
                      .slice(EventStartIndex, EventStartIndex + 5)
                      .map((t: eachEventI) => (
                        <TempDate
                          key={t.id}
                          date={t.startDate}
                          active={`${t.id}` === event}
                          id={t.id}
                        />
                      ))
                  )}
                  {/* <TempDate date={11} topText="2022.08" />
                  <TempDate date={12} disable topText="2022.08" />
                  <TempDate date={13} active topText="2022.08" />
                  <TempDate date={14} />
                  <TempDate date={15} disable /> */}
                  <div
                    className="cursor-pointer"
                    onClick={() => changeEventStartIndex(1)}
                  >
                    <ChevronRightGray />
                  </div>
                </div>
              </div>

              <div className="flightInfo-schedule mt-[90px] flex flex-col ">
                <h1 className="flight-info-title m-0">항공일정</h1>
                <div className="">
                  <div className="mt-[26.4px] flex gap-[10px]">
                    <Departure width="25.2px" height="26.23px" />
                    <span className="m-0 font-['Pretendard'] text-[22px] font-medium leading-[26.25px] text-[#000000]">
                      출국
                    </span>
                  </div>
                  {/* <div className="flightInfo-departureTime flex-ic mt-[20px] justify-between">
                    <div className="flightInfo-departureText flex-ic gap-[22px]">
                      <span className="m-0 font-['Pretendard'] text-[16px] font-normal leading-[22px] text-[#b1b1b1]">
                        경유 2회
                      </span>
                      <div className="flex-ic gap-[8px]">
                        <span className="m-0 font-['Pretendard'] text-[16px] font-normal leading-[22px] text-[#818181]">
                          대기시간 : 시간
                        </span>
                        <span className="m-0 font-['Pretendard'] text-[16px] font-normal leading-[22px] text-[#b1b1b1]">
                          |
                        </span>
                        <span className="m-0 font-['Pretendard'] text-[16px] font-normal leading-[22px] text-[#818181]">
                          비행시간 : 시간
                        </span>
                      </div>
                    </div>
                    <div className=" flex">
                      <span className="m-0 font-['Pretendard'] text-[16px] font-normal leading-[22px] text-[#ff5c00]">
                        총 소요시간 : 시간
                      </span>
                    </div>
                  </div> */}
                  <div className="mt-[10px] w-full">
                    <FlightGraph info={flightInfo.departure} />
                  </div>
                </div>

                <div className="">
                  <div className="mt-[26.4px] flex gap-[10px]">
                    <Arrival width="25.2px" height="26.23px" />
                    <span className="m-0 font-['Pretendard'] text-[22px] font-medium leading-[26.25px] text-[#000000]">
                      귀국
                    </span>
                  </div>
                  {/* <div className="flightInfo-departureTime flex-ic mt-[20px] justify-between">
                    <div className="flightInfo-departureText flex-ic gap-[22px]">
                      <span className="m-0 font-['Pretendard'] text-[16px] font-normal leading-[22px] text-[#b1b1b1]">
                        경유 2회
                      </span>
                      <div className="flex-ic gap-[8px]">
                        <span className="m-0 font-['Pretendard'] text-[16px] font-normal leading-[22px] text-[#818181]">
                          대기시간 : 시간
                        </span>
                        <span className="m-0 font-['Pretendard'] text-[16px] font-normal leading-[22px] text-[#b1b1b1]">
                          |
                        </span>
                        <span className="m-0 font-['Pretendard'] text-[16px] font-normal leading-[22px] text-[#818181]">
                          비행시간 : 시간
                        </span>
                      </div>
                    </div>
                    <div className=" flex">
                      <span className="m-0 font-['Pretendard'] text-[16px] font-normal leading-[22px] text-[#ff5c00]">
                        총 소요시간 : 시간
                      </span>
                    </div>
                  </div> */}
                  <div className="mt-[10px] w-full">
                    <FlightGraph info={flightInfo.arrival} />
                  </div>
                </div>
              </div>

              <div className="flightInfo-deadline mt-[102px] flex flex-col gap-[10px]">
                <h1 className="flight-info-title m-0 font-['Pretendard'] text-[25px] font-semibold leading-[29.83px] text-[#00192f]">
                  예약마감
                </h1>
                <span className="m-0 font-['Pretendard'] text-[20px] font-normal leading-[45px] text-[#000000]">
                  출발일 {data.endDay}일 전
                </span>
              </div>
            </div>

            <PageCategory data={data} />
          </div>
          {/* 위 div = 컨텐츠 */}
        </div>
        {/* 위 div = Amber Div */}
        <FlightBookMenu
          data={data}
          eventData={eventData}
          adultNum={adultNum}
          childNum={childNum}
          infantNum={infantNum}
          totalPeopleNum={totalPeopleNum}
          setAdultNum={setAdultNum}
          setChildNum={setChildNum}
          setInfantNum={setInfantNum}
          setTotalPeopleNum={setTotalPeopleNum}
          adultPrice={adultPrice}
          childPrice={childPrice}
          infantPrice={infantPrice}
          setAdultPrice={setAdultPrice}
          setChildPrice={setChildPrice}
          setInfantPrice={setInfantPrice}
          totalPrice={totalPrice}
        />
      </div>
      <CubeezOtherProducts />
    </div>
  );
};

const TempDate = (props: {
  date: string;
  active?: boolean;
  disable?: boolean;
  id?: string | number;
}) => {
  const { date, active, disable, id = null } = props;
  const dateObj = new Date(date);
  const router = useRouter();

  if (disable) {
    return (
      <div
        className={`flex-center h-[169.17px] w-[15%] cursor-pointer flex-col rounded-[6px] border border-[#bababa]`}
      >
        <div className="flex-center flex-col">
          <h2 className="m-0 mt-[3px] font-['Pretendard'] text-[17.7px] font-medium leading-[21.2px] text-[#bababa]">
            {date.slice(0, 7).replace("-", ".")}
          </h2>
          <h1 className="m-0 font-['Pretendard'] text-[39.4px] font-semibold leading-[46.99px] text-[#bababa] ">
            {dateObj.getDate()}
          </h1>
          <h2 className="m-0 mt-[3px] font-['Pretendard'] text-[17.7px] font-medium leading-[21.2px] text-[#bababa]">
            ({getDay(date)})
          </h2>
          {/* <h3 className="m-0 mt-[10px] font-['Pretendard'] text-[19.7px] font-normal leading-[23.5px] text-[#bababa]">
            10:00
          </h3> */}
        </div>
        {/* <p className="m-0 hidden font-['Pretendard'] text-[15.75px] font-normal leading-[18.8px] text-[#a4a4a4]">
          194만원
        </p> */}
      </div>
    );
  }

  return (
    <div
      className={`flex h-[169.17px] w-[15%] cursor-pointer flex-col items-center justify-center rounded-[6px] border-[1px] ${
        active ? "border-[#ff5c00]" : "border-[#bababa]"
      }`}
      onClick={() => {
        if (active || id === null) return;
        router.replace({ query: { ...router.query, event: id } });
      }}
    >
      <div className="flex-center flex-col">
        <h2 className="font-['Pretendard'] text-[17.7px] font-medium leading-[21.2px] text-[#353535]">
          {date.slice(0, 7).replace("-", ".")}
        </h2>
        <h1 className="m-0 font-['Pretendard'] text-[39.4px] font-semibold leading-[46.99px] text-[#353535] ">
          {dateObj.getDate()}
        </h1>

        <h2 className="font-['Pretendard'] text-[17.7px] font-medium leading-[21.2px] text-[#353535]">
          ({getDay(date)})
        </h2>
        {/* <h3 className="m-0 font-['Pretendard'] text-[19.7px] font-normal leading-[23.5px] text-[#353535]">
          10:00
        </h3> */}
      </div>
      {/* <p className="m-0 font-['Pretendard']  text-[15.75px] font-normal leading-[18.8px] text-[#a4a4a4]">
        194만원
      </p> */}
    </div>
  );
};

export default PcPage;
