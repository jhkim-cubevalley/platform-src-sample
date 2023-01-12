import React, { useEffect, useState } from "react";
import TempImg from "../../public/images/tmp/gridTemp.png";
import Image from "next/image";
import TempProfile from "../../public/images/tmp/tmpProfile.png";
import Link from "next/link";

interface SmallButton {
  type: "package" | "md";
}

const SearchResultCard = (props: any) => {
  const { data } = props;
  const [tempData, setTempData] = useState({
    category: "",
    price: null,
    hashTags: [],
    name: "",
    continent: "",
    country: "",
    cubeezName: "",
    id: 0,
    image: "",
  });

  const SmallButton = (props: SmallButton) => {
    const { type } = props;

    if (type === "package") {
      return (
        <div className="flex-center h-[16.34px] w-[58.69px] rounded-[4px] bg-[#ff5c00] lg:h-[25.6px] lg:w-[91.94px]">
          <span className="m-0 font-['Pretendard'] text-[8.72px] font-extrabold leading-[10.4px] text-[#ffffff] lg:text-[13.66px] lg:leading-[16.3px]">
            패키지 여행
          </span>
        </div>
      );
    }

    if (type === "md") {
      return (
        <div className="flex-center h-[16.34px] w-[44.31px] rounded-[2.54px] border-[1.2px] border-[#ff5c00]  bg-[#ffffff] lg:h-[25.6px] lg:w-[69.41px] lg:rounded-[4px] lg:border-none">
          <span className="m-0   font-['Pretendard'] text-[8.72px] font-extrabold leading-[10.4px] text-[#ff5c00]  lg:text-[13.66px] lg:leading-[16.3px]">
            MD 추천
          </span>
        </div>
      );
    }
    return <div></div>;
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      setTempData({ ...data });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, [data, isLoading]);

  if (isLoading) {
    return <div>로딩중</div>;
  }

  return (
    <Link href={`/product/${tempData.id}`}>
      <div className="flex w-full overflow-hidden rounded-[11px] border border-[#cecece] shadow-[0px_1.6px_6.2px_rgba(0,0,0,0.1)] hover:cursor-pointer lg:flex-col lg:overflow-visible">
        {/* 이미지 */}
        <div className="relative flex w-[45%] min-w-[105px] justify-between lg:w-full">
          <div className="absolute mt-[14px] flex w-full items-center justify-between lg:mt-[28px] lg:px-[28px]">
            {tempData.cubeezName !== "" ? (
              <div className="z-10 ml-[8px] flex w-full items-center gap-[5px] lg:ml-0 lg:gap-[7.6px]">
                <div className="lg:flex-center hidden ">
                  <Image
                    src={TempProfile.src}
                    alt=""
                    width="25px"
                    height="25px"
                  />
                </div>
                <div className="flex-center lg:hidden ">
                  <Image
                    src={TempProfile.src}
                    alt=""
                    width="17px"
                    height="17px"
                  />
                </div>
                <span className="m-0 font-['Pretendard'] text-[10px] font-semibold leading-[11.94px] text-[#ffffff] lg:text-[15.13px] lg:leading-[18px]">
                  {tempData.cubeezName}
                </span>
              </div>
            ) : (
              <div />
            )}
            <div className="z-10 hidden items-center justify-between gap-2 lg:flex">
              <SmallButton type="package" />
              <SmallButton type="md" />
            </div>
          </div>
          <div className="z-1 relative hidden aspect-video w-full lg:flex">
            <Image
              src={tempData.image}
              alt=""
              objectFit="cover"
              layout="fill"
            />
            <div className="z-1 absolute h-full w-full bg-gradient-to-r from-[rgba(0,0,0,0.4)] to-transparent" />
          </div>
          <div className="z-1  relative flex h-full w-full lg:hidden">
            <Image
              src={tempData.image}
              alt=""
              layout="fill"
              objectFit="cover"
            />
            <div className="z-1 absolute h-full w-full bg-gradient-to-r from-[rgba(0,0,0,0.4)] to-transparent" />
          </div>
        </div>
        {/* 이미지 */}
        {/* 정보 */}
        <div className="flex w-full flex-col px-[13.55px] py-[15px]  lg:px-[25px] lg:pt-[18px] lg:pb-[27px] ">
          <div className="flex items-center justify-start gap-[9.66px] lg:hidden ">
            <SmallButton type="package" />
            <SmallButton type="md" />
          </div>
          <div className="mt-[10.5px] flex items-center gap-[8.5px] lg:mt-0">
            {tempData.hashTags.map((hashTag: any, index: any) => (
              <p
                key={index}
                className="m-0 font-['Pretendard'] text-[9px] font-semibold leading-[10.78px] text-[#717171] lg:text-[14px] lg:leading-[16px]"
              >
                #{hashTag}
              </p>
            ))}
          </div>
          <h1 className="mb-0 mt-[8.24px] font-['Pretendard']  text-[12.12px] font-bold leading-[14.47px] text-[#000000] lg:mt-[13px] lg:text-[21px] lg:leading-[25px]">
            {tempData.name}
          </h1>
          <p className="mb-0 mt-[4.86px]  font-['Pretendard'] text-[8.75px] font-medium leading-[10.45px] text-[#bdbdbd] lg:mt-[9px] lg:text-[15px] lg:leading-[18px]">
            {tempData.name}
          </p>
          <h1 className="mb-0 mt-[19.77px] self-end font-['Pretendard'] text-[16.93px] font-semibold leading-[20.2px] text-[#ff5c00] lg:mt-[27px] lg:text-[25.6px] lg:leading-[31px]">
            {(tempData.price || 0).toLocaleString()}원
          </h1>
        </div>
        {/* 정보 */}
      </div>
    </Link>
  );
};

export default SearchResultCard;
