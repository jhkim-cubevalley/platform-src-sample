import React, { useEffect, useState } from "react";
import H_Separator from "../../components/H_Separator";
import SearchResults from "../../components/productSearch/SearchResults";
import { useRouter } from "next/router";
import SearchOrangeMobile from "../../public/images/search-orange-mobile.svg";
import ArrowLeft from "../../public/images/arrow-left.svg";
import MobileBottomBar from "../../components/MobileBottomBar";

const tempCategory = [
  {
    name: "전체",
    quantities: null,
  },
  {
    name: "패키지 여행",
    quantities: 5,
  },
  {
    name: "가이드 여행",
    quantities: 6,
  },
  {
    name: "호텔 숙박권",
    quantities: 8,
  },
  {
    name: "입장권",
    quantities: 3,
  },
];

export const tempData = [
  {
    name: "아이템1",
    createdAt: new Date(),
    price: Math.random(),
    category: "패키지 여행",
    hashTags: ["sdsa", "dasdsa", "dasdas", "wqedsa"],
  },
  {
    name: "아이템2",
    createdAt: new Date(),
    price: Math.random(),
    category: "패키지 여행",
    hashTags: ["sdsa", "dasdsa", "dasdas", "wqedsa"],
  },
  {
    name: "아이템3",
    createdAt: new Date(),
    price: Math.random(),
    category: "패키지 여행",
    hashTags: ["sdsa", "dasdsa", "dasdas", "wqedsa"],
  },
  {
    name: "아이템4",
    createdAt: new Date(),
    price: Math.random(),
    category: "호텔 숙박권",
    hashTags: ["sdsa", "dasdsa", "dasdas", "wqedsa"],
  },
  {
    name: "아이템5",
    createdAt: new Date(),
    price: Math.random(),
    category: "가이드 여행",
    hashTags: ["sdsa", "dasdsa", "dasdas", "wqedsa"],
  },
  {
    name: "아이템6",
    createdAt: new Date(),
    price: Math.random(),
    category: "패키지 여행",
    hashTags: ["sdsa", "dasdsa", "dasdas", "wqedsa"],
  },
  {
    name: "아이템7",
    createdAt: new Date(),
    price: Math.random(),
    category: "패키지 여행",
    hashTags: ["sdsa", "dasdsa", "dasdas", "wqedsa"],
  },
  {
    name: "아이템8",
    createdAt: new Date(),
    price: Math.random(),
    category: "입장권",
    hashTags: ["sdsa", "dasdsa", "dasdas", "wqedsa"],
  },
  {
    name: "아이템9",
    createdAt: new Date(),
    price: Math.random(),
    category: "호텔 숙박권",
    hashTags: ["sdsa", "dasdsa", "dasdas", "wqedsa"],
  },
  {
    name: "아이템10",
    createdAt: new Date(),
    price: Math.random(),
    category: "호텔 숙박권",
    hashTags: ["sdsa", "dasdsa", "dasdas", "wqedsa"],
  },
];

const SmallProductButton = (props: any) => {
  const { active, text, quantities } = props;

  return (
    <div
      className={`box-border flex cursor-pointer items-center justify-around gap-[5.6px] rounded-[5px] px-[17px] py-[7.5px] lg:min-w-[125px] lg:gap-[9.9px] lg:py-[10px] lg:px-[29px] ${
        active ? "bg-[#ff5c00]" : "bg-[#d9d9d9]"
      }`}
    >
      <span
        className={`whitespace-nowrap font-['Pretendard'] text-[13px] font-bold leading-[15.51px] lg:text-[24px] lg:leading-[29px] ${
          active ? "text-white" : "text-[#525252]"
        }`}
      >
        {text}
      </span>
      {quantities && (
        <span
          className={`font-['Pretendard'] text-[13px] font-bold leading-[15.51px] lg:text-[24px] lg:leading-[29px] ${
            active ? "text-white" : "text-[#525252]"
          }`}
        >
          {quantities}
        </span>
      )}
    </div>
  );
};

const SearchResult = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([...tempData]);
  const router = useRouter();
  const { searchterm } = router.query;

  const changeFilteredData = () => {
    if (currentPage === 1) {
      setFilteredData([...tempData]);
    }
    if (currentPage === 2) {
      const newArray = tempData.filter(
        (item) => item.category === "패키지 여행"
      );
      setFilteredData([...newArray]);
    }
    if (currentPage === 3) {
      const newArray = tempData.filter(
        (item) => item.category === "가이드 여행"
      );
      setFilteredData([...newArray]);
    }
    if (currentPage === 4) {
      const newArray = tempData.filter(
        (item) => item.category === "호텔 숙박권"
      );
      setFilteredData([...newArray]);
    }
    if (currentPage === 5) {
      const newArray = tempData.filter((item) => item.category === "입장권");
      setFilteredData([...newArray]);
    }
  };

  useEffect(() => {
    changeFilteredData();
  }, [currentPage]);

  useEffect(() => {
    console.log(filteredData);
  }, [currentPage]);

  return (
    <div className="flex w-full flex-col overflow-hidden pt-[38px] lg:overflow-visible lg:px-[300px] lg:py-[114px]">
      {/* "~~" 검색결과 S*/}

      <div
        className="px-[30px] lg:hidden lg:px-0"
        onClick={() => router.push("/")}
      >
        <ArrowLeft />
      </div>

      <div className="mt-[31px] flex  items-center justify-between px-[30px] pb-[20px] lg:mt-0 lg:justify-start lg:px-0 lg:pb-0">
        <div className="flex-ic gap-[10px] lg:gap-[20px]">
          <h1 className="m-0 font-['Pretendard'] text-[20px] font-bold leading-[23.87px] text-[#171717] lg:text-[50px] lg:font-semibold lg:leading-[60px]">{`'${searchterm}'`}</h1>
          <h2 className="m-0 font-['Pretendard'] text-[16px] font-semibold leading-[19.09px] text-[#5a5a5a] lg:text-[32px] lg:leading-[38px] ">
            검색 결과
          </h2>
        </div>
        <div className="flex-center lg:hidden">
          <SearchOrangeMobile />
        </div>
      </div>

      <H_Separator mobileThick gray />

      {/* "~~" 검색결과 E*/}

      {/* 전체, 패키지 여행.... 분류 S*/}
      <div className="no-scrollbar flex w-full items-center gap-[10px] overflow-scroll py-[18px] px-[30px] lg:mt-[94px]  lg:gap-[25.6px] lg:overflow-visible lg:p-0  lg:px-0">
        {tempCategory.map((category, index) => (
          <div
            key={index}
            className="flex"
            onClick={() => setCurrentPage(index + 1)}
          >
            <SmallProductButton
              text={category.name}
              active={index + 1 === currentPage}
              quantities={
                index === 0
                  ? tempData.length
                  : tempData.filter(
                      (item, index) => item.category === category.name
                    ).length
              }
            />
          </div>
        ))}
      </div>
      {/* 전체, 패키지 여행.... 분류 E*/}

      <H_Separator mobileThick gray />

      <div className="mt-[48px] hidden lg:block">
        <H_Separator className="mt-[48px]" color="#ff5765" height="2px" />
      </div>

      <SearchResults data={filteredData} />

      <MobileBottomBar />
    </div>
  );
};

export default SearchResult;
