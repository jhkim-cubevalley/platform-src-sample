import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import { FullImageCardRolling } from "../FullImageCard";
import H_Separator from "../H_Separator";
import PageCategory from "../PageCategory";
import Test from "../Test";
import CubeezOtherProducts from "./CubeezOtherProducts";
import MobileBookMenu from "./MobileBookMenu";
import ArrowLeft from "../../public/images/arrow-left.svg";
import Share from "../../public/images/share.svg";
import BookMark from "../../public/images/bookmark.svg";
import QM from "../../public/images/qm_small.svg";
import LocationSmall from "../../public/images/location-small.svg";
import LeafSmall from "../../public/images/leaf-small.svg";
import PersonSmall from "../../public/images/person-small.svg";
import CompassSmall from "../../public/images/compass-small.svg";
import TempProfile from "../../public/images/tmp/tmpProfile.png";
import ChevronRight from "../../public/images/chevron-right.svg";
import ChevronDown from "../../public/images/chevron-down-gray.svg";
import QMBig from "../../public/images/qm.svg";
import MinusGray from "../../public/images/minusGray.svg";
import MinusBlack from "../../public/images/minusBlack.svg";
import PlusBlack from "../../public/images/plusBlack.svg";
import Departure from "../../public/images/plane_departure.svg";
import Arrival from "../../public/images/plane_arrival.svg";
import { FlightGraph } from "../FlightGraph";

const categoryList = ["소분류", "소분류", "소분류", "소분류", "소분류"];

const MobilePage = (props: any) => {
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
    id,
    flightInfo,
  } = props;
  const router = useRouter();

  const hashtagList = data && "tag" in data && data.tag.split(",");

  return (
    <div className="no-scrollbar flex w-full flex-col lg:hidden">
      {/* 모바일 헤더 S*/}
      <div className="flex-ic h-[58.2px] justify-between bg-[#ffffff] px-[20px]">
        <div onClick={() => router.back()}>
          <ArrowLeft />
        </div>
        <div className="flex-ic gap-[27px]">
          <button
            onClick={() => {
              if (!(navigator && navigator.share)) return;
              navigator.share({
                url: `https://test.cubeez.kr/product/${id}`,
                title: data?.name || undefined,
              });
            }}
          >
            <Share />
          </button>
          {/* <BookMark width="13.24px" height="19.25px" /> */}
        </div>
      </div>
      {/* 모바일 헤더 E*/}
      <FullImageCardRolling
        cardInfoList={
          data?.image && data.image.length !== 0
            ? data.image.map(({ imageUrl }: any) => ({
                imageUrl,
                mainTitle: "",
                subTitle: "",
              }))
            : Array(9)
                .fill(0)
                .map((_, i) => ({
                  imageUrl: `/images/tmp/product/${i + 1}.png`,
                  mainTitle: ``,
                  subTitle: "",
                }))
        }
        noBackground
        large
      />

      <div className="mt-[10.5px] flex w-full flex-col bg-[#ffffff] px-[20px] pb-[26px]">
        {/* <div className="flex-ic justify-between">
          <div className="flex-ic">
            <span className="m-0 font-['Pretendard'] text-[10px] font-medium leading-[12px] text-[#9c9c9c]">
              중분류 {">"} 소분류
            </span>
          </div>
          <div className="flex-ic gap-[4px]">
            <span className="m-0 font-['Pretendard'] text-[11.2px] font-medium leading-[11.2px] text-[#00192f]">
              예약상태
            </span>
            <QM />
          </div>
        </div> */}

        <h1 className="mb-0 mt-[18px] font-['Pretendard'] text-[20.5px] font-bold leading-[24.5px] text-[#000000]">
          {data && data.name}
        </h1>

        <div className="flex-ic mt-[8px] gap-[5.8px]">
          {/* {categoryList.map((item, index) => (
            <div
              className="flex-center bg-[#f0f0f0] p-[3.5px_9.5px]"
              key={index}
            >
              <span className="m-0 font-['Pretendard'] text-[11px] font-medium leading-[13.13px] text-[#ff5c00]">
                {item}
              </span>
            </div>
          ))} */}
          {[{ ...data?.category[0]?.categoryThree }].map((category, index) => (
            <div
              key={index}
              className="flex-center bg-[#f0f0f0] p-[3.5px_9.5px]"
            >
              <span className="m-0 font-['Pretendard'] text-[11px] font-medium leading-[13.13px] text-[#ff5c00]">
                {category.nameKo}
              </span>
            </div>
          ))}
          {hashtagList.map((t: string, index: number) => (
            <div
              key={index}
              className="flex-center bg-[#f0f0f0] p-[3.5px_9.5px]"
            >
              <span className="m-0 font-['Pretendard'] text-[11px] font-medium leading-[13.13px]">
                {t}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-[15px] flex flex-col gap-[11px]">
          <div className="flex-ic gap-[7px]">
            <LocationSmall />
            <span className="m-0 font-['Pretendard'] text-[12px] font-normal leading-[14.3px] text-[#464646]">
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
          <div className="flex-ic gap-[7px]">
            <PersonSmall />{" "}
            <div className="flex-ic gap-[8px]">
              <span className="m-0 font-['Pretendard'] text-[12px] font-semibold leading-[14.32px] text-[#464646]">
                현재 에약 3명
              </span>
              <span className="m-0 font-['Pretendard'] text-[12px] font-semibold leading-[14.32px] text-[#838383]">
                |
              </span>
              <span className="m-0 font-['Pretendard'] text-[12px] font-semibold leading-[14.32px] text-[#9f9f9f]">
                {`최소출발 ${data?.minPeople}명 최대출발 ${data?.maxPeople}명`}
              </span>
            </div>
          </div>
        </div>

        <p className="mb-0 mt-[19px] font-['Pretendard'] text-[14px] font-semibold leading-[22px] text-[#1a1a1a]">
          {data?.description}
        </p>

        <div className="mt-[26px] flex flex-col gap-[16.5px]">
          {data &&
            data.pros.split(",").map((item: any, index: any) => (
              <div className="flex-ic gap-[14px]" key={index}>
                <LeafSmall />
                <span className="m-0 font-['Pretendard'] text-[14px] font-medium leading-[16.71px] text-[#282828]">
                  {item}
                </span>
              </div>
            ))}
        </div>

        {/* <div className="my-[25px]">
          <H_Separator />
        </div>

        <div className="flex-center h-[33.5px] w-[134px] cursor-pointer rounded-[5px] border-[1px] border-[#00192f] ">
          <span className="m-0 font-['Pretendard'] text-[14px] font-semibold leading-[17px] text-[#00192f]">
            여행상품 핵심정보
          </span>
        </div> */}
      </div>

      <H_Separator mobileThick />
      {data?.cubeez && (
        <>
          <div className="flex-ic gap-[16px] py-[20px] px-[20px]">
            <div>
              {/* <Image
                src={data?.cubeez?.profileUrl || ""}
                alt=""
                layout="fixed"
                width="54px"
                height="54px"
              /> */}
            </div>
            <div className="flex w-full flex-col justify-center gap-[3px]">
              <div>
                <span className="m-0 font-['Pretendard'] text-[16px] font-semibold leading-[19.12px] text-[#000000]">
                  {data?.cubeez?.name
                    ? data?.cubeez?.name
                    : data?.admin?.name
                    ? "관리자"
                    : "알 수 없는 큐비즈"}
                </span>
              </div>
              {/* <div className="flex-ic gap-[9px]">
                <span className="m-0 font-['Pretendard'] text-[12px] font-normal leading-[19px] text-[#838383]">
                  후기 500
                </span>
                <span className="m-0 font-['Pretendard'] text-[12px] font-normal leading-[19px] text-[#838383]">
                  |
                </span>
                <span className="m-0 font-['Pretendard'] text-[12px] font-normal leading-[19px] text-[#838383]">
                  팬 1,890
                </span>
              </div> */}
            </div>
            <div>
              <ChevronRight />
            </div>
          </div>
          <H_Separator mobileThick />
        </>
      )}

      {/* 금액 S*/}
      {/* <div className="flex w-full flex-col px-[20px] pb-[30px]">
        <div className="flex-ic w-full justify-between py-[15px]">
          <div className="flex-ic gap-[12px]">
            <span className="m-0 font-['Pretendard'] text-[18px] font-medium leading-[21.5px] text-[#000000]">
              금액
            </span>
            <ChevronDown width="10px" height="10px" />
          </div>
          <div className="flex-center">
            <span className="m-0 font-['Pretendard'] text-[22px] font-bold leading-[26.25px] text-[#ff5c00]">
              3,000,000원
            </span>
          </div>
        </div>
        <H_Separator />
        <div className="mt-[16.5px] flex w-full flex-col gap-[15px]">
          <div className="flex-ic justify-between">
            <QMBig />
            <span className="m-0 font-['Pretendard'] text-[14px] font-normal leading-[16.72px] text-[#bbbbbb]">
              *유류할증료 : 10,000원
            </span>
          </div>
          <div className="flex-ic">
            <div className="flex-ic gap-[35px]">
              <span className="m-0 whitespace-nowrap font-['Pretendard'] text-[16px] font-normal leading-[19px] text-[#353535]">
                성인
              </span>
              <div className="flex-ic gap-[16px]">
                <MinusGray width="21.42px" height="21.42px" />
                <span className="m-0 font-['Pretendard'] text-[20px] font-normal leading-[24px] text-[#353535]">
                  1
                </span>
                <PlusBlack width="21.42px" height="21.42px" />
              </div>
            </div>
            <div className="flex-ic w-full justify-end">
              <span className="m-0 font-['Pretendard'] text-[18px] font-medium leading-[21.5px] text-[#353535]">
                2,000,000원
              </span>
            </div>
          </div>
          <div className="flex-ic">
            <div className="flex-ic gap-[35px]">
              <span className="m-0 whitespace-nowrap font-['Pretendard'] text-[16px] font-normal leading-[19px] text-[#353535]">
                아동
              </span>
              <div className="flex-ic gap-[16px]">
                <MinusBlack width="21.42px" height="21.42px" />
                <span className="m-0 font-['Pretendard'] text-[20px] font-normal leading-[24px] text-[#353535]">
                  1
                </span>
                <PlusBlack width="21.42px" height="21.42px" />
              </div>
            </div>
            <div className="flex-ic w-full justify-end">
              <span className="m-0 font-['Pretendard'] text-[18px] font-medium leading-[21.5px] text-[#353535]">
                1,000,000원
              </span>
            </div>
          </div>
          <div className="flex-ic">
            <div className="flex-ic gap-[35px]">
              <span className="m-0 whitespace-nowrap font-['Pretendard'] text-[16px] font-normal leading-[19px] text-[#353535]">
                유아
              </span>
              <div className="flex-ic w-full gap-[16px]">
                <MinusGray width="21.42px" height="21.42px" />
                <span className="m-0 font-['Pretendard'] text-[20px] font-normal leading-[24px] text-[#353535]">
                  0
                </span>
                <PlusBlack width="21.42px" height="21.42px" />
              </div>
            </div>
            <div className="flex-ic w-full justify-end">
              <span className="m-0 font-['Pretendard'] text-[18px] font-medium leading-[21.5px] text-[#353535]">
                0원
              </span>
            </div>
          </div>
        </div>
      </div> */}
      {/* 금액 E*/}
      {/* <H_Separator mobileThick /> */}

      {/* 여행일정 S*/}
      <div className="flex flex-col gap-[22px] px-[20px] pt-[30px]">
        {/* <h1 className="m-0 font-['Pretendard'] text-[18px] font-bold leading-[21.5px] text-[#181818]">
          여행일정
        </h1> */}

        {/* <div className="flex-ic h-[87.8px] w-full justify-around rounded-[4.7px] border-[1.12px] border-[#eaeaea] ">
          <div className="flex flex-col">
            <span className="m-0 font-['Pretendard'] text-[18px] font-semibold leading-[21.5px] text-[#353535]">
              08.09 (화)
            </span>
            <span className="m-0 font-['Pretendard'] text-[18px] font-medium leading-[21.5px] text-[#353535]">
              10:00
            </span>
          </div>
          <div className="flex-center rounded-[4.7px] border-[1px] border-[#ababab] p-[3.8px_7.5px_3.7px_8.4px]">
            <span className="m-0 font-['Pretendard'] text-[14px] font-medium leading-[20.3px] text-[#717171]">
              4박 5일
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-s['Pretendard'] m-0 text-[18px] font-semibold leading-[21.5px] text-[#353535]">
              08.13 (토)
            </span>
            <span className="m-0 font-['Pretendard'] text-[18px] font-medium leading-[21.5px] text-[#353535]">
              10:00
            </span>
          </div>
        </div> */}

        {/* 항공일정 S*/}
        <div className="flex w-full flex-col pb-[61px]">
          <h1 className="m-0 font-['Pretendard'] text-[18px] font-bold leading-[21.5px] text-[#181818]">
            항공일정
          </h1>

          <div className="flex-ic mt-[23px] gap-[9px]">
            <Departure width="18.1px" height="18.9px" />
            <span className="m-0 font-['Pretendard'] text-[18px] font-medium leading-[21.5px] text-[#000000]">
              출국
            </span>
          </div>
          {/* <div className="flex-ic mt-[12px] gap-[18px]">
            <span className="m-0 font-['Pretendard'] text-[14px] font-normal leading-[18px] text-[#b1b1b1]">
              경유 0회
            </span>
            <span className="m-0 font-['Pretendard'] text-[14px] font-medium leading-[18px] text-[#818181]">
              비행시간 : 2시간
            </span>
          </div> */}
          <div className="mt-[6px] w-full">
            <FlightGraph info={flightInfo.departure} />
          </div>

          {/* <div className="flex-center mt-[8.2px] h-[38.6px] w-full rounded-[4.7px] bg-[#f5f5f5]">
            <span className="m-0 font-['Pretendard'] text-[14px] font-semibold leading-[22px] text-[#ff5c00]">
              총 소요시간:2시간
            </span>
          </div> */}

          <div className="flex-ic mt-[23px] gap-[9px]">
            <Arrival width="18.1px" height="18.9px" />
            <span className="m-0 font-['Pretendard'] text-[18px] font-medium leading-[21.5px] text-[#000000]">
              귀국
            </span>
          </div>
          {/* <div className="flex-ic mt-[12px] gap-[18px]">
            <span className="m-0 font-['Pretendard'] text-[14px] font-normal leading-[18px] text-[#b1b1b1]">
              경유 0회
            </span>
            <span className="m-0 font-['Pretendard'] text-[14px] font-medium leading-[18px] text-[#818181]">
              비행시간 : 2시간
            </span>
          </div> */}

          <div className="mt-[6px] w-full">
            <FlightGraph info={flightInfo.arrival} />
          </div>

          {/* <div className="flex-center mt-[8.2px] h-[38.6px] w-full rounded-[4.7px] bg-[#f5f5f5]">
            <span className="m-0 font-['Pretendard'] text-[14px] font-semibold leading-[22px] text-[#ff5c00]">
              총 소요시간:2시간
            </span>
          </div> */}
        </div>
        {/* 항공일정 E*/}
      </div>
      {/* 여행일정 E*/}

      {/* 카테고리 S*/}
      <PageCategory data={data} />
      {/* 카테고리 E*/}

      <H_Separator mobileThick />

      {/* <CubeezOtherProducts /> */}

      {/* <MobileBookMenu
        data={data}
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
      /> */}
    </div>
  );
};

export default MobilePage;
