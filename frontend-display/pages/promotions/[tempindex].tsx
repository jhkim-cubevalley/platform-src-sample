import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import TempImage1 from "../../public/images/tmp/exibition-detail.png";
import Calendar from "../../public/images/calendar.svg";
import ChevronDown from "../../public/images/chevron-down-gray.svg";
import { tempData } from "../searchresults/[searchterm]";
import SearchResultCard from "../../components/productSearch/SearchResultCard";
import SearchResults from "../../components/productSearch/SearchResults";

const TempIndex = () => {
  const router = useRouter();
  const { query } = router;
  const [currentFilter, setCurrentFilter] = useState(1);

  return (
    <div className="box-border flex  w-full flex-col bg-[#fafafa] pb-[104px] lg:px-[300px] lg:py-[114px]">
      <div>
        <Image
          alt=""
          src={TempImage1.src}
          layout="fixed"
          width="1318px"
          height="1556px"
        />
      </div>

      <div className="mt-[21px] flex w-full flex-col">
        <div className="flex w-full items-center gap-[10px]">
          <h1 className="m-0 whitespace-nowrap font-['Pretendard'] text-[32px] font-bold leading-[38px] text-[#545454]">
            기획전 제목으로 여행가기
          </h1>
          <Calendar />
        </div>

        {/* <div className="flex items-center justify-end gap-[44px]">
          <span
            className={`font-['Pretendard'] m-0 cursor-pointer text-[24px] font-bold leading-[28.7px] ${
              currentFilter === 1 ? "text-[#717171]" : "text-[#a0a0a0]"
            } `}
            onClick={() => setCurrentFilter(1)}
          >
            인기순
          </span>
          <span
            className={`font-['Pretendard'] m-0 cursor-pointer text-[24px] font-bold leading-[28.7px] ${
              currentFilter === 2 ? "text-[#717171]" : "text-[#a0a0a0]"
            } `}
            onClick={() => setCurrentFilter(2)}
          >
            최신순
          </span>
        </div> */}

        {/* <div className="mt-[41px] grid w-full auto-rows-fr grid-cols-3 gap-[47px]">
          {tempData.map((item, index) => (
            <SearchResultCard key={index} data={item} />
          ))}
        </div> */}

        <div className="mt-[41px] w-full ">
          <SearchResults
            data={tempData}
            showLimited
            filterCategories={["인기순", "최신순"]}
          />
        </div>
      </div>
    </div>
  );
};

export default TempIndex;
