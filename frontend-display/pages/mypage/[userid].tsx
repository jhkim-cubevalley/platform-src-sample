import React, { useState } from "react";
import Kakao from "../../public/images/tmp/kakao.png";
import Image from "next/image";
import Profile from "../../public/images/tmp/tmpProfile.png";
import H_Category from "../../components/H_Category";
import ReservationHistroy from "../../components/ReservationHistroy";
import ReservationCard from "../../components/ReservationCard";
import CubeezImage from "../../public/images/cubeezalaboza.png";
import Naver from "../../public/images/tmp/naver.png";
import EmailSvg from "../../public/images/email.svg";
import ArrowLeft from "../../public/images/arrow-left.svg";
import Pen from "../../public/images/pen.svg";
import { useRouter } from "next/router";
import H_Separator from "../../components/H_Separator";

const tempCategories = [
  "예약내역",
  "관심상품",
  "인센티브 여행",
  "여행 후기",
  "포인트 내역",
  "쿠폰함",
  "정보수정",
];

const tempData = [
  {
    code: "VNBJ1352415",
    name: "정통 대륙 횡단",
    cubeez: "큐브밸리",
    departure: "2022-10-24",
    departurePlace: "인천/서울",
    peopleCount: 5,
    status: "예약 대기",
    category: "여행상품",
  },
  {
    code: "VNBJ1352415",
    name: "정통 대륙 횡단",
    cubeez: "큐브밸리",
    departure: "2022-10-24",
    departurePlace: "인천/서울",
    peopleCount: 5,
    status: "예약 확정",
    category: "여행상품",
  },
  {
    code: "VNBJ1352415",
    name: "정통 대륙 횡단",
    cubeez: "큐브밸리",
    departure: "2022-10-24",
    departurePlace: "인천/서울",
    peopleCount: 5,
    status: "예약 확정",
    category: "여행상품",
  },
  {
    code: "VNBJ1352415",
    name: "정통 대륙 횡단",
    cubeez: "큐브밸리",
    departure: "2022-10-24",
    departurePlace: "인천/서울",
    peopleCount: 7,
    status: "예약 확정",
    category: "호텔숙박권",
  },
  {
    code: "VNBJ1352415",
    name: "정통 대륙 횡단",
    cubeez: "큐브밸리",
    departure: "2022-10-24",
    departurePlace: "인천/서울",
    peopleCount: 5,
    status: "예약 대기",
    category: "입장권",
  },
  {
    code: "VNBJ1352415",
    name: "정통 대륙 횡단",
    cubeez: "큐브밸리",
    departure: "2022-10-24",
    departurePlace: "인천/서울",
    peopleCount: 5,
    status: "예약 대기",
    category: "입장권",
  },
  {
    code: "VNBJ1352415",
    name: "정통 대륙 횡단",
    cubeez: "큐브밸리",
    departure: "2022-10-24",
    departurePlace: "인천/서울",
    peopleCount: 5,
    status: "예약 대기",
    category: "입장권",
  },
  {
    code: "VNBJ1352415",
    name: "정통 대륙 횡단",
    cubeez: "큐브밸리",
    departure: "2022-10-24",
    departurePlace: "인천/서울",
    peopleCount: 5,
    status: "예약 대기",
    category: "호텔숙박권",
  },
  {
    code: "VNBJ1352415",
    name: "정통 대륙 횡단",
    cubeez: "큐브밸리",
    departure: "2022-10-24",
    departurePlace: "인천/서울",
    peopleCount: 5,
    status: "예약 확정",
    category: "호텔숙박권",
  },
  {
    code: "VNBJ1352415",
    name: "정통 대륙 횡단",
    cubeez: "큐브밸리",
    departure: "2022-10-24",
    departurePlace: "인천/서울",
    peopleCount: 5,
    status: "예약 대기",
    category: "입장권",
  },
  {
    code: "VNBJ1352415",
    name: "정통 대륙 횡단",
    cubeez: "큐브밸리",
    departure: "2022-10-24",
    departurePlace: "인천/서울",
    peopleCount: 5,
    status: "예약 확정",
    category: "입장권",
  },
  {
    code: "VNBJ1352415",
    name: "정통 대륙 횡단",
    cubeez: "큐브밸리",
    departure: "2022-10-24",
    departurePlace: "인천/서울",
    peopleCount: 5,
    status: "예약 확정",
    category: "여행상품",
  },
];

const Reservations = () => {
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);

  return (
    <div className=" box-border flex w-full flex-col overflow-hidden bg-[#fafafa] lg:overflow-visible lg:px-[300px] lg:py-[114px] lg:pb-[104px]">
      <div className="flex-ic lg:hidden">
        <ArrowLeft />
      </div>
      <h1 className="mb-0 font-['Pretendard'] text-[20px] font-bold leading-[23.87px] text-[#000000] lg:text-[30px] lg:leading-[35.8px]">
        마이페이지
      </h1>

      <H_Separator mobileThick />

      {/* 하얀 박스 유저정보 S*/}
      <div className="box-border flex w-full bg-[#ffffff] lg:mt-[65px] lg:mb-[66px] lg:min-h-[330px] lg:gap-[97px] lg:rounded-[41px] lg:py-[41px] lg:px-[128px]">
        {/* Col1 S */}
        <div className="flex w-full flex-col justify-center lg:flex-row lg:items-center lg:justify-start lg:gap-[70px]">
          <div className="flex flex-col">
            <div className="flex  items-center gap-[9px]">
              <Image
                src={Naver.src}
                width="20px"
                height="20px"
                alt=""
                layout="fixed"
              />
              <p className="m-0 whitespace-nowrap font-['Pretendard'] text-[10.87px] font-semibold leading-[15.88px] text-[#000000] lg:text-[14px] lg:leading-[20px]">
                네이버 연동
              </p>
            </div>
            <div className="mt-[13px] flex items-center ">
              <h2 className="m-0 whitespace-nowrap font-['Pretendard'] text-[18px] font-bold leading-[21.48px] text-[#000000] lg:text-[30px] lg:leading-[35.8px]">
                이름(닉네임){" "}
              </h2>
              <p className="m-0 whitespace-nowrap font-['Pretendard'] text-[14.55px] font-medium leading-[17.36px] text-[#000000] lg:text-[22px] lg:leading-[26px]">
                님 환영합니다
              </p>
            </div>
            <div className="mt-[25px] hidden items-center gap-[10px] lg:flex ">
              <EmailSvg />
              <p className="m-0 whitespace-nowrap font-['Pretendard'] text-[16px] font-normal leading-[23px] text-[#000000]">
                dsadsa@gmail.com
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col ">
            <div className="hidden items-center gap-[16px] lg:flex">
              <p className="m-0 whitespace-nowrap font-['Pretendard'] text-[20px] font-bold leading-[24px] text-[#7e7e7e]">
                적립 포인트
              </p>
              <span className="m-0 whitespace-nowrap font-['Pretendard'] text-[20px] font-bold leading-[24px] text-[#434343]">
                2,000P
              </span>
            </div>
            <div className="mt-[20px] hidden items-center lg:flex">
              <p className="m-0 whitespace-nowrap font-['Pretendard'] text-[20px] font-bold leading-[24px] text-[#7e7e7e]">
                사용 가능 쿠폰
              </p>
              <span className="m-0font-['Pretendard'] m-0 whitespace-nowrap text-[20px] font-bold leading-[24px] text-[#434343]">
                2개
              </span>
            </div>
            <div className="mt-[35px] hidden items-center gap-[19px] lg:flex">
              <Image
                alt=""
                src={Kakao.src}
                width="38px"
                height="38px"
                objectFit="cover"
              />
              <Image
                alt=""
                src={Kakao.src}
                width="38px"
                height="38px"
                objectFit="cover"
              />
              <Image
                alt=""
                src={Kakao.src}
                width="38px"
                height="38px"
                objectFit="cover"
              />
              <Image
                alt=""
                src={Kakao.src}
                width="38px"
                height="38px"
                objectFit="cover"
              />
              <Image
                alt=""
                src={Kakao.src}
                width="38px"
                height="38px"
                objectFit="cover"
              />
            </div>
            <div className="flex items-center gap-[11.54px] self-end lg:hidden">
              <Image
                alt=""
                src={Kakao.src}
                width="22.17px"
                height="22.17px"
                objectFit="cover"
              />
              <Image
                alt=""
                src={Kakao.src}
                width="22.17px"
                height="22.17px"
                objectFit="cover"
              />
              <Image
                alt=""
                src={Kakao.src}
                width="22.17px"
                height="22.17px"
                objectFit="cover"
              />
              <Image
                alt=""
                src={Kakao.src}
                width="22.17px"
                height="22.17px"
                objectFit="cover"
              />
              <Image
                alt=""
                src={Kakao.src}
                width="22.17px"
                height="22.17px"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        {/* Col1 E */}

        {/* Col2 S */}
        <div className=" hidden flex-col justify-center gap-[25px] border-l pl-[47px] lg:flex">
          <div className="flex items-center">
            <span className="m-0 font-['Pretendard'] text-[20px] font-bold leading-[24px] text-[#7e7e7e]">
              관심 큐비즈
            </span>
          </div>
          <div className="flex items-center gap-[22px]">
            <div className="box-border flex flex-col gap-[10px]">
              <Image
                src={Profile.src}
                alt=""
                objectFit="cover"
                width="65px"
                height="65px"
              />
              <p className="m-0 font-['Pretendard']  text-[12px] font-semibold leading-[14px] text-[#1c1c1c]">
                큐비즈 이름
              </p>
            </div>
            <div className="box-border flex flex-col gap-[10px]">
              <Image
                src={Profile.src}
                alt=""
                objectFit="cover"
                width="65px"
                height="65px"
              />
              <p className="m-0 font-['Pretendard']  text-[12px] font-semibold leading-[14px] text-[#1c1c1c]">
                큐비즈 이름
              </p>
            </div>
            <div className="box-border flex flex-col gap-[10px]">
              <Image
                src={Profile.src}
                alt=""
                objectFit="cover"
                width="65px"
                height="65px"
              />
              <p className="m-0 font-['Pretendard'] text-[12px] font-semibold leading-[14px] text-[#1c1c1c]">
                큐비즈 이름
              </p>
            </div>
          </div>
        </div>
        {/* Col2 E */}
      </div>
      {/* 하얀 박스 유저정보 E*/}

      <H_Separator mobileThick />

      {/* 카테고리 선택 S*/}
      <H_Category categories={tempCategories} />
      {/* 카테고리 선택 E*/}

      {/* 결과 표 S*/}
      <ReservationHistroy
        data={tempData}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
      />

      <div className="mt-7 flex flex-col gap-[10px]">
        {filteredData.map((item, index) => (
          <div key={index} className="items-center] flex">
            <ReservationCard data={item} />
          </div>
        ))}
      </div>
      {/* 결과 표 E*/}

      {/* 이미지 S */}
      <div className="relative mt-[194px] box-border flex cursor-pointer">
        <Image
          alt=""
          src={CubeezImage.src}
          width="1316px"
          height="200px"
          objectFit="cover"
          layout="fixed"
        />
        <div className="absolute left-[42px] top-2/4 z-50  flex -translate-y-2/4 flex-col justify-center gap-[20px]">
          <h1 className="m-0 font-['Pretendard'] text-[25px] font-semibold leading-[30px] text-[#ffffff]">
            큐비즈 알아보기
          </h1>
          <p className="m-0 font-['Pretendard'] text-[16px] font-normal leading-[19px] text-[#d1d1d1] ">
            큐비즈 안내 큐비즈 안내 큐비즈 안내 큐비즈 안내
          </p>
        </div>
      </div>
      {/* 이미지 E*/}
    </div>
  );
};

export default Reservations;
