import React, { useEffect, useState } from "react";
import H_SmallCategory from "./H_SmallCategory";
import ReservationCard from "./ReservationCard";

const tempSmallCategories = ["전체", "여행상품", "호텔숙박권", "입장권"];

const ReservationHistroy = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, filteredData, setFilteredData } = props; //Context로 최적화 해야할 듯
  const [loadedData, setLoadedData] = useState({});

  useEffect(() => {
    try {
      setLoadedData({ ...data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>로딩중</div>;
  }

  return (
    <div className=" flex w-full flex-col">
      {/* 작은 카테고리 S*/}
      <H_SmallCategory
        originalData={data}
        smallCategories={tempSmallCategories}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
      />
      {/* 작은 카테고리 E*/}

      {/* 총 몇 건 S*/}
      <div className="mt-[58px] flex items-center ">
        <h2 className="m-0 font-['Pretendard'] text-[25px] font-bold leading-[30px] text-[#7b7b7b]">
          총 {filteredData.length}건
        </h2>
      </div>
      {/* 총 몇 건 E*/}

      {/* 결과 표  S*/}
      <div className="mt-[30px] flex w-full flex-col">
        <div className="flex w-full  items-center justify-between border-[3px] border-x-0 border-[#ff5c00] py-[21px] px-[20px] ">
          <div className="flex w-[10%] items-center justify-center">
            <p className="m-0 font-['Pretendard'] text-[20px] font-bold leading-[24px] text-[#353535] ">
              상품코드
            </p>
          </div>
          <div className="flex  w-[20%] items-center justify-center">
            <p className="m-0 font-['Pretendard'] text-[20px] font-bold leading-[24px] text-[#353535] ">
              여행상품명
            </p>
          </div>
          <div className="flex w-[10%] items-center justify-center">
            <p className="m-0 font-['Pretendard'] text-[20px] font-bold leading-[24px] text-[#353535] ">
              큐비즈
            </p>
          </div>
          <div className="flex w-[10%] items-center justify-center ">
            <p className="m-0 font-['Pretendard'] text-[20px] font-bold leading-[24px] text-[#353535] ">
              분류
            </p>
          </div>
          <div className="flex w-[10%] items-center justify-center ">
            <p className="m-0 font-['Pretendard'] text-[20px] font-bold leading-[24px] text-[#353535] ">
              출발일
            </p>
          </div>
          <div className="flex w-[10%] items-center justify-center ">
            <p className="m-0 font-['Pretendard'] text-[20px] font-bold leading-[24px] text-[#353535] ">
              출발지
            </p>
          </div>
          <div className="flex w-[10%] items-center justify-center ">
            <p className="m-0 font-['Pretendard'] text-[20px] font-bold leading-[24px] text-[#353535] ">
              인원
            </p>
          </div>
          <div className="flex w-[10%] items-center justify-center ">
            <p className="m-0 font-['Pretendard'] text-[20px] font-bold leading-[24px] text-[#353535] ">
              상태
            </p>
          </div>
          <div className="flex w-[10%] items-center justify-center ">
            <p className="m-0 font-['Pretendard'] text-[20px] font-bold leading-[24px] text-[#353535] ">
              보험
            </p>
          </div>
        </div>
      </div>
      {/* 결과 표  E*/}
    </div>
  );
};

export default ReservationHistroy;
