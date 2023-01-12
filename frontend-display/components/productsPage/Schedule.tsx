import React, { useContext, useState } from "react";
import Dot_line from "../../public/images/dot_line.svg";
import Img from "../../public/images/tmp/gridTemp.png";
import Image from "next/image";
import { SingleAccordion } from "../Accordion";
import Location from "../../public/images/location.svg";
import ItemCarousel from "../ItemCarousel";
import { FullImageCardRolling } from "../FullImageCard";
import { UserContext } from "../../contexts/UserStore";
import {
  eachPlanDetailI,
  eachPlanI,
  eachProductI,
} from "../../utils/api/product";

const tempSchedule = [
  {
    day: "1",
    date: "2022.01.27",
    breakfast: "없음",
    lunch: "현지식",
    dinner: "호텔식",
    places: ["인천", "에스파냐", "쇼핑 몰", "선택관광", "리우 플라자"],
    description:
      "설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다.",
    hotel: {
      name: "리우 플라자",
      location: "20202로 202002길",
      description: "설명설명설명",
      contactNumber: "010-1234-5678",
      webSite: "",
      amenities: ["부대1`", "부대2"],
      roomFacilities: ["객실1", "객실2"],
    },
  },
  {
    day: "2",
    date: "2022.01.27",
    breakfast: "없음",
    lunch: "현지식",
    dinner: "호텔식",
    places: ["인천", "에스파냐", "쇼핑 몰", "선택관광", "리우 플라자"],
    description:
      "설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다.",
    hotel: {
      name: "리우 플라자",
      location: "20202로 202002길",
      description: "설명설명설명",
      contactNumber: "010-1234-5678",
      webSite: "",
      amenities: ["부대1`", "부대2"],
      roomFacilities: ["객실1", "객실2"],
    },
  },
  {
    day: "3",
    date: "2022.01.27",
    breakfast: "없음",
    lunch: "현지식",
    dinner: "호텔식",
    places: ["인천", "에스파냐", "쇼핑 몰", "선택관광", "리우 플라자"],
    description:
      "설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다.",
    hotel: {
      name: "리우 플라자",
      location: "20202로 202002길",
      description: "설명설명설명",
      contactNumber: "010-1234-5678",
      webSite: "",
      amenities: ["부대1`", "부대2"],
      roomFacilities: ["객실1", "객실2"],
    },
  },
  {
    day: "4",
    date: "2022.01.27",
    breakfast: "없음",
    lunch: "현지식",
    dinner: "호텔식",
    places: ["인천", "에스파냐", "쇼핑 몰", "선택관광", "리우 플라자"],
    description:
      "설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다.",
    hotel: {
      name: "리우 플라자",
      location: "20202로 202002길",
      description: "설명설명설명",
      contactNumber: "010-1234-5678",
      webSite: "",
      amenities: ["부대1`", "부대2"],
      roomFacilities: ["객실1", "객실2"],
    },
  },
  {
    day: "5",
    date: "2022.01.27",
    breakfast: "없음",
    lunch: "현지식",
    dinner: "호텔식",
    places: ["인천", "에스파냐", "쇼핑 몰", "선택관광", "리우 플라자"],
    description:
      "설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다.",
    hotel: {
      name: "리우 플라자",
      location: "20202로 202002길",
      description: "설명설명설명",
      contactNumber: "010-1234-5678",
      webSite: "",
      amenities: ["부대1`", "부대2"],
      roomFacilities: ["객실1", "객실2"],
    },
  },
  {
    day: "6",
    date: "2022.01.27",
    breakfast: "없음",
    lunch: "현지식",
    dinner: "호텔식",
    places: ["인천", "에스파냐", "쇼핑 몰", "선택관광", "리우 플라자"],
    description:
      "설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다.",
    hotel: {
      name: "리우 플라자",
      location: "20202로 202002길",
      description: "설명설명설명",
      contactNumber: "010-1234-5678",
      webSite: "",
      amenities: ["부대1`", "부대2"],
      roomFacilities: ["객실1", "객실2"],
    },
  },
  {
    day: "7",
    date: "2022.01.27",
    breakfast: "없음",
    lunch: "현지식",
    dinner: "호텔식",
    places: ["인천", "에스파냐", "쇼핑 몰", "선택관광", "리우 플라자"],
    description:
      "설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다.",
    hotel: {
      name: "리우 플라자",
      location: "20202로 202002길",
      description: "설명설명설명",
      contactNumber: "010-1234-5678",
      webSite: "",
      amenities: ["부대1`", "부대2"],
      roomFacilities: ["객실1", "객실2"],
    },
  },
];

const Schedule = ({ data }: { data: eachProductI }) => {
  const [currentDay, setCurrentDay] = useState(1);
  const context = useContext(UserContext);
  const {
    productData: { plan },
  } = context;
  const nowPlan = data.plan.find((t) => t.day === currentDay);
  return (
    <div className="schedule flex w-full flex-col pt-[35px] lg:max-w-[870px]">
      <div className="no-scrollbar schedule-buttonbox flex w-full gap-[10px] overflow-scroll  px-[20px]  lg:gap-3 lg:px-0">
        {data.plan.map((_, index: any) => (
          <div
            key={index}
            onClick={() => setCurrentDay(index + 1)}
            className={`box-border flex cursor-pointer items-center justify-center rounded-[4px] border-[1.3px] p-[4.7px_12px] lg:max-w-[80px]  lg:p-[7px_18px] ${
              currentDay === index + 1 ? "border-[#ff5c00]" : "border-[#d8d8d8]"
            }`}
          >
            <p
              className={`m-0 whitespace-nowrap font-['Pretendard'] text-[13.5px] font-medium leading-[16.07px] lg:text-[20px] lg:leading-[23.87px] ${
                currentDay === index + 1 ? "text-[#ff5c00]" : "text-[#d8d8d8]"
              } `}
            >
              {index + 1}일차
            </p>
          </div>
        ))}
      </div>

      {/* Day-N Component */}

      {/* {currentDay === 1 && <Day1 data={tempSchedule[0]} />}
      {currentDay !== 1 && <DayEmpty />} */}

      {nowPlan && <EachDaySchedule plan={nowPlan} />}
    </div>
  );
};

const CategoryButton = (props: any) => {
  const { text } = props;
  return (
    <div className="box-border flex items-center justify-center bg-[#f0f0f0] p-[3.4px_8.7px] lg:p-[5px_13px] ">
      <p className="m-0 font-['Pretendard'] text-[10.8px] font-medium leading-[12.3px] text-[#000000] lg:text-[16px] lg:leading-[29.09px]">
        {text}
      </p>
    </div>
  );
};

const CategoryTitle = (props: any) => {
  const { text, children } = props;
  return (
    <span className="m-0 font-['Pretendard'] text-[14px] font-semibold leading-[16.7px] text-[#000000] lg:text-[21px] lg:leading-[25px]">
      {children}
    </span>
  );
};

CategoryButton.defaultPrpos = {
  text: "기본텍스트",
};

const DayEmpty = () => {
  return <div className="w-full">작업중작업중작업중작업중작업중</div>;
};

const Timeline = (props: any) => {
  const { isLast } = props;

  return (
    <div className="timeline relative flex h-full w-full ">
      <Dot_line />
      {!isLast ? (
        <div className="timeline-line absolute left-2/4 top-[12.5px] flex h-full w-[1.6px] -translate-x-2/4  bg-black" />
      ) : null}
    </div>
  );
};

Timeline.defaultProps = {
  isLast: false,
};

const EachDayScheduleEachDetail = ({
  data,
  isLast = false,
}: {
  data: eachPlanDetailI;
  isLast?: boolean;
}) => {
  const isLibrary = data?.library && data.library !== null;
  return (
    <div className="timeline-box flex gap-[26px]">
      <div className="timeline-timeline h-full">
        <Timeline isLast={isLast} />
      </div>
      <div className="timeline-content flex w-full flex-col">
        <div className="mb-4 flex flex-col">
          <div className="mb-1 flex items-center gap-3">
            <CategoryButton
              text={isLibrary ? data.library?.category : data.type}
            />
            <CategoryTitle>
              {isLibrary ? data.library?.name : data.content}
            </CategoryTitle>
          </div>
          <div className="flex flex-col ">
            <h1 className="m-0 font-['Pretendard'] text-[16px] font-medium leading-[25px] text-[#000000] ">
              {data.library?.description || data.content}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

const EachDaySchedule = ({ plan }: { plan: eachPlanI }) => {
  console.log({ plan });
  return (
    <div className="schedule-brief mt-[23px] flex w-full flex-col px-[20px] lg:mt-[55px] lg:px-0 ">
      <div className="schedule-brief-date flex items-center gap-3">
        <h1 className="m-0 font-['Pretendard'] text-[16px] font-semibold leading-[19.22px] text-[#00192f] lg:text-[25px] lg:leading-[30px]">
          {plan.day}일차
        </h1>
        <span className="font-['Pretendard'] text-[12.9px] font-normal leading-[14.2px] text-[#494949] lg:text-[20px] lg:leading-[22px]">
          {/* {data.date} */}
          2022.01.27
        </span>
      </div>

      <div className="schedule-brief-description mt-2 flex">
        <div
          className="ck-content m-0 font-['Pretendard'] text-[13px] font-normal leading-[22px] text-[#000000] lg:text-[18px] lg:leading-[30px]"
          dangerouslySetInnerHTML={{ __html: plan.description }}
        ></div>
      </div>

      {plan.planDetail.map((t, i) => (
        <EachDayScheduleEachDetail
          data={t}
          key={i}
          isLast={i === plan.planDetail.length - 1}
        />
      ))}
    </div>
  );
};

const Day1 = (props: any) => {
  const { data } = props;
  return (
    <div className="schedule-brief mt-[23px] flex w-full flex-col px-[20px] lg:mt-[55px] lg:px-0 ">
      <div className="schedule-brief-date flex items-center gap-3">
        <h1 className="m-0 font-['Pretendard'] text-[16px] font-semibold leading-[19.22px] text-[#00192f] lg:text-[25px] lg:leading-[30px]">
          1일차
        </h1>
        <span className="font-['Pretendard'] text-[12.9px] font-normal leading-[14.2px] text-[#494949] lg:text-[20px] lg:leading-[22px]">
          {data.date}
        </span>
      </div>

      <div className="schedule-brief-mealHotel flex flex-col ">
        <div className="schedule-brief-meals flex gap-[38px]">
          <div className="schedule-brief-meal-box flex items-center gap-[6.8px] lg:gap-[10px]">
            <div className="box-border flex rounded-[4px] bg-[#f0f0f0f0] p-[2.9px_12.9px] lg:p-[4px_18px]">
              <span className="font-['Pretendard'] text-[12.2px] font-medium leading-[14.5px] text-[#898989]  lg:text-[17px] lg:leading-[20.29px]">
                조식
              </span>
            </div>
            <span className="font-['Pretendard'] text-[14px] font-medium leading-[16.7px] text-[#212121] lg:text-[20px] lg:leading-[23.87px]">
              {data.breakfast}
            </span>
          </div>
          <div className="schedule-brief-meal-box flex items-center gap-[6.8px] lg:gap-[10px]">
            <div className="box-border flex rounded-[4px] bg-[#f0f0f0f0] p-[2.9px_12.9px] lg:p-[4px_18px]">
              <span className="font-['Pretendard'] text-[12.2px] font-medium leading-[14.5px] text-[#898989]  lg:text-[17px] lg:leading-[20.29px]">
                중식
              </span>
            </div>
            <span className="font-['Pretendard'] text-[14px] font-medium leading-[16.7px] text-[#212121] lg:text-[20px] lg:leading-[23.87px]">
              {data.lunch}
            </span>
          </div>
          <div className="schedule-brief-meal-box flex items-center gap-[6.8px] lg:gap-[10px]">
            <div className="box-border flex rounded-[4px] bg-[#f0f0f0f0] p-[2.9px_12.9px] lg:p-[4px_18px]">
              <span className="font-['Pretendard'] text-[12.2px] font-medium leading-[14.5px] text-[#898989]  lg:text-[17px] lg:leading-[20.29px]">
                석식
              </span>
            </div>
            <span className="font-['Pretendard'] text-[14px] font-medium leading-[16.7px] text-[#212121] lg:text-[20px] lg:leading-[23.87px]">
              {data.dinner}
            </span>
          </div>
        </div>
        <div className="schedule-brief-hotel"></div>
      </div>

      <div className="schedule-brief-description flex">
        <p className="m-0 font-['Pretendard'] text-[13px] font-normal leading-[22px] text-[#000000] lg:text-[18px] lg:leading-[30px]">
          {data.description}
        </p>
      </div>

      {/* 타임라인 컴포넌트 */}
      {/* 미팅장소 */}
      <div className="timeline-box flex h-full gap-[26px]">
        <div className="timeline-timeline flex h-full">
          <Timeline />
        </div>
        <div className="timeline-content flex w-full flex-col">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <CategoryButton text="미팅장소" />
              <CategoryTitle>{data.places[0]}</CategoryTitle>
            </div>
            <div className="flex">
              <select className="w-full" placeholder="임시데이터" />
            </div>
          </div>
        </div>
      </div>
      {/* 미팅장소 */}

      {/* 관광 */}
      <div className="timeline-box flex gap-[26px]">
        <div className="timeline-timeline h-full">
          <Timeline />
        </div>
        <div className="timeline-content flex w-full flex-col">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <CategoryButton text="관광" />
              <CategoryTitle>{data.places[1]}</CategoryTitle>
            </div>
            <div className="flex flex-col ">
              <h1 className="m-0 font-['Pretendard'] text-[16px] font-medium leading-[25px] text-[#000000] ">
                장소설명장소설명장소설명장소설명장소설명장소설명장소설명장소설명
              </h1>
              <div className=" hidden gap-[6px] lg:flex">
                <Image alt="" src={Img.src} width="400" height="221.56" />
                <Image alt="" src={Img.src} width="400" height="221.56" />
              </div>
              <div className="flex lg:hidden">
                <FullImageCardRolling
                  cardInfoList={[
                    { imageUrl: Img.src, mainTitle: "" },
                    { imageUrl: Img.src, mainTitle: "" },
                  ]}
                />
              </div>
              <select />
            </div>
          </div>
        </div>
      </div>
      {/* 관광 */}

      {/* 쇼핑 */}
      <div className="timeline-box flex gap-[26px]">
        <div className="timeline-timeline h-full">
          <Timeline />
        </div>
        <div className="timeline-content flex w-full flex-col">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <CategoryButton text="쇼핑" />
              <CategoryTitle>{data.places[2]}</CategoryTitle>
            </div>
            <div className="flex flex-col ">
              <h1 className="m-0 font-['Pretendard'] text-[16px] font-medium leading-[25px] text-[#000000] ">
                장소설명장소설명장소설명장소설명장소설명장소설명장소설명장소설명
              </h1>
              <div className=" hidden gap-[6px] lg:flex">
                <Image alt="" src={Img.src} width="400" height="221.56" />
                <Image alt="" src={Img.src} width="400" height="221.56" />
              </div>
              <div className="flex lg:hidden">
                <FullImageCardRolling
                  cardInfoList={[
                    { imageUrl: Img.src, mainTitle: "" },
                    { imageUrl: Img.src, mainTitle: "" },
                  ]}
                />
              </div>
              <select />
              <select />
            </div>
          </div>
        </div>
      </div>
      {/* 쇼핑 */}

      {/* 선택관광 */}
      <div className="timeline-box flex gap-[26px]">
        <div className="timeline-timeline h-full">
          <Timeline />
        </div>
        <div className="timeline-content flex w-full flex-col">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <CategoryButton text="선택관광" />
              <CategoryTitle>{data.places[3]}</CategoryTitle>
            </div>
            <div className="flex flex-col ">
              <h1 className="m-0 font-['Pretendard'] text-[16px] font-medium leading-[25px] text-[#000000] ">
                장소설명장소설명장소설명장소설명장소설명장소설명장소설명장소설명
              </h1>
              <div className=" hidden gap-[6px] lg:flex">
                <Image alt="" src={Img.src} width="400" height="221.56" />
                <Image alt="" src={Img.src} width="400" height="221.56" />
              </div>
              <div className="flex lg:hidden">
                <FullImageCardRolling
                  cardInfoList={[
                    { imageUrl: Img.src, mainTitle: "" },
                    { imageUrl: Img.src, mainTitle: "" },
                  ]}
                />
              </div>
              <select />
            </div>
          </div>
        </div>
      </div>
      {/* 선택관광 */}

      {/* 선택관광 */}
      <div className="timeline-box flex gap-[26px]">
        <div className="timeline-timeline h-full">
          <Timeline isLast />
        </div>
        <div className="timeline-content flex w-full flex-col">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <CategoryButton text="호텔" />
              <CategoryTitle>{data.places[4]}</CategoryTitle>
            </div>
            <div className="flex flex-col ">
              <h1 className="m-0 font-['Pretendard'] text-[16px] font-medium leading-[25px] text-[#000000] ">
                장소설명장소설명장소설명장소설명장소설명장소설명장소설명장소설명
              </h1>
              <div className=" hidden gap-[6px] lg:flex">
                <Image alt="" src={Img.src} width="400" height="221.56" />
                <Image alt="" src={Img.src} width="400" height="221.56" />
              </div>
              <div className="flex lg:hidden">
                <FullImageCardRolling
                  cardInfoList={[
                    { imageUrl: Img.src, mainTitle: "" },
                    { imageUrl: Img.src, mainTitle: "" },
                  ]}
                />
              </div>

              <div className="accordion-box mt-[18px] flex w-full rounded-[6px] border">
                <SingleAccordion headerTitle="자세히 보기">
                  <div className="accordion-item-box box-border flex w-full flex-col px-[47px] pt-[40px] pb-[50px]">
                    {/* 호텔 이름,사진, 주소 디브 */}
                    <div className="flex ">
                      <div className="flex w-[40%] flex-col">
                        <p className="m-0">유럽 스페인 마드리드</p>
                        <h1 className="m-0 mt-[11px] font-['Pretendard'] text-[24px] font-bold leading-[30px] text-[#000000]">
                          {data.hotel.name}
                        </h1>
                        <div className="mt-8 flex items-center gap-2">
                          <Location />
                          <span className="m-0 ">{data.hotel.location}</span>
                        </div>
                      </div>
                      {/* 호텔 사진 슬라이더 */}
                      <div className=" flex w-[60%]">
                        <ItemCarousel />
                      </div>
                      {/* 호텔 사진 슬라이더 */}
                    </div>
                    {/* 호텔 이름,사진, 주소 디브 End */}

                    {/* 호텔 설명하는 디브 Start*/}
                    <div className="mt-[30px] flex">
                      <p className="m-0">{data.hotel.description}</p>
                    </div>
                    {/* 호텔 설명하는 디브 End*/}

                    {/* 호텔 연락처 웹사이트 부대시설 객실시설 디브 Start*/}
                    <div className="mt-[50px] flex w-full justify-between">
                      <div className="flex w-2/4 flex-col gap-[38px]">
                        <div className="flex flex-col">
                          <h1 className="font-['Pretendard'] text-[18px] font-bold leading-[21px] text-[#000000]">
                            연락처
                          </h1>
                          <span>연락처</span>
                        </div>

                        <div className="flex flex-col">
                          <h1 className="font-['Pretendard'] text-[18px] font-bold leading-[21px] text-[#000000]">
                            부대시설
                          </h1>
                          <span>부대시설</span>
                        </div>
                      </div>

                      <div className="flex w-2/4 flex-col gap-[38px]">
                        <div className="flex flex-col">
                          <h1 className="font-['Pretendard'] text-[18px] font-bold leading-[21px] text-[#000000]">
                            웹사이트
                          </h1>
                          <span>연락처</span>
                        </div>

                        <div className="flex flex-col">
                          <h1 className="font-['Pretendard'] text-[18px] font-bold leading-[21px] text-[#000000]">
                            객실시설
                          </h1>
                          <span>부대시설</span>
                        </div>
                      </div>
                    </div>
                    {/* 호텔 연락처 웹사이트 부대시설 객실시설 디브 End*/}
                  </div>
                </SingleAccordion>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 선택관광 */}
    </div>
  );
};

export default Schedule;
