import React, { useEffect, useState } from "react";
import H_Category from "../../components/H_Category";
import SearchResultCard from "../../components/productSearch/SearchResultCard";
import ChevronDown from "../../public/images/chevron-down-gray.svg";
import SearchOrangeMobile from "../../public/images/search-orange-mobile.svg";
import ArrowLeft from "../../public/images/arrow-left.svg";
import H_Separator from "../../components/H_Separator";
import SearchResults from "../../components/productSearch/SearchResults";
import MobileBottomBar from "../../components/MobileBottomBar";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getProductAPI } from "../../utils/api/product";
import { useCategoryMenu } from "../../components/TopMenuNavBar";
import Link from "next/link";
import { formatDate } from "../../utils/formatDate";

const tempContinents = [
  "아시아",
  "유럽",
  "북아메리카",
  "라틴 아메리카",
  "오세아니아",
  "특수지역",
];

const filterCategories = ["인기순", "최신순", "낮은가격순", "높은가격순"];

const tempCountries = {
  asia: ["중국", "일본", "필리핀", "싱가폴"],
  europe: ["프랑스", "이탈리아"],
  n_america: ["미국"],
  l_america: ["브라질"],
  oceania: ["뉴질랜드"],
  etc: ["나라1", "나라2"],
};

const tempData = [
  {
    name: "아이템1",
    createdAt: new Date(),
    price: Math.random(),
    category: "패키지 여행",
    hashTags: ["sdsa", "dasdsa", "dasdas", "wqedsa"],
    continent: "asia",
    country: "china",
  },
  {
    name: "아이템2",
    createdAt: new Date(),
    price: Math.random(),
    category: "패키지 여행",
    hashTags: ["sdsa", "dasdsa", "dasdas", "wqedsa"],
    continent: "europe",
    country: "italy",
  },
  {
    name: "아이템3",
    createdAt: new Date(),
    price: Math.random(),
    category: "패키지 여행",
    hashTags: ["sdsa", "dasdsa", "dasdas", "wqedsa"],
    continent: "n-america",
    country: "us",
  },
  {
    name: "아이템4",
    createdAt: new Date(),
    price: Math.random(),
    category: "호텔 숙박권",
    hashTags: ["sdsa", "dasdsa", "dasdas", "wqedsa"],
    continent: "l-america",
    country: "brazil",
  },
  {
    name: "아이템5",
    createdAt: new Date(),
    price: Math.random(),
    category: "가이드 여행",
    hashTags: ["sdsa", "dasdsa", "dasdas", "wqedsa"],
    continent: "oceania",
    country: "austrailia",
  },
  {
    name: "아이템6",
    createdAt: new Date(),
    price: Math.random(),
    category: "패키지 여행",
    hashTags: ["sdsa", "dasdsa", "dasdas", "wqedsa"],
    continent: "etc",
    country: "나라",
  },
  {
    name: "아이템7",
    createdAt: new Date(),
    price: Math.random(),
    category: "패키지 여행",
    hashTags: ["sdsa", "dasdsa", "dasdas", "wqedsa"],
    continent: "asia",
    country: "japan",
  },
  {
    name: "아이템8",
    createdAt: new Date(),
    price: Math.random(),
    category: "입장권",
    hashTags: ["sdsa", "dasdsa", "dasdas", "wqedsa"],
    continent: "asia",
    country: "singapore",
  },
  {
    name: "아이템9",
    createdAt: new Date(),
    price: Math.random(),
    category: "호텔 숙박권",
    hashTags: ["sdsa", "dasdsa", "dasdas", "wqedsa"],
    continent: "europe",
    country: "france",
  },
  {
    name: "아이템10",
    createdAt: new Date(),
    price: Math.random(),
    category: "호텔 숙박권",
    hashTags: ["sdsa", "dasdsa", "dasdas", "wqedsa"],
    continent: "oceania",
    country: "newzealand",
  },
  {
    name: "아이템10",
    createdAt: new Date(),
    price: Math.random(),
    category: "호텔 숙박권",
    hashTags: ["sdsa", "dasdsa", "dasdas", "wqedsa"],
    continent: "asia",
    country: "philipine",
  },
  {
    name: "아이템10",
    createdAt: new Date(),
    price: Math.random(),
    category: "호텔 숙박권",
    hashTags: ["sdsa", "dasdsa", "dasdas", "wqedsa"],
    continent: "asia",
    country: "singapore",
  },
  {
    name: "아이템10",
    createdAt: new Date(),
    price: Math.random(),
    category: "호텔 숙박권",
    hashTags: ["sdsa", "dasdsa", "dasdas", "wqedsa"],
    continent: "asia",
    country: "japan",
  },
];

const ProductList = () => {
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();
  const {
    categoryOne = null,
    categoryTwo = null,
    categoryThree = null,
  } = router.query as {
    categoryOne?: string;
    categoryTwo?: string;
    categoryThree?: string;
  };
  const { data: productData, mutate } = useSWR(router.query, () =>
    getProductAPI({ categoryOne, categoryTwo, categoryThree })
  );
  // console.log(
  //   productData?.result?.data &&
  //     productData.result.data
  //       .map((t) => [
  //         t.category?.[0]?.categoryOne?.nameKo,
  //         t.category?.[0]?.categoryTwo?.nameKo,
  //         t.category?.[0]?.categoryThree?.nameKo,
  //       ])
  //       .join(" ")
  // );
  const { category } = useCategoryMenu();
  const target = category ? category?.find((t) => t.id === categoryOne) : null;
  const secondTarget =
    target && target.sub ? target.sub.find((t) => t.id === categoryTwo) : null;
  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };
  // console.log({ categoryOne, categoryTwo, target, secondTarget, category });
  if (!(categoryOne && categoryTwo && target && secondTarget)) return <></>;
  return (
    <div className="flex w-full  flex-col lg:px-20 lg:py-[114px] 2xl:px-[300px]">
      {/* 대륙 카테고리 S*/}
      <div className="hidden lg:flex lg:items-center lg:gap-[52px]">
        {target.sub &&
          target.sub.map((continent, index) => (
            <Link
              key={index}
              href={{
                pathname: "/productlist",
                query: { categoryOne, categoryTwo: continent.id },
              }}
            >
              <h1
                className={`m-0 cursor-pointer  font-['Pretendard'] font-semibold ${
                  continent.id === categoryTwo
                    ? "text-[50px]  leading-[60px]  text-[#171717]"
                    : "text-[32px]  leading-[38.19px]  text-[#898989]"
                }  `}
              >
                {continent.title}
              </h1>
            </Link>
          ))}
      </div>
      {/* mobile S*/}
      <div className="flex w-full flex-col gap-[28px] px-[30px] pb-[20px] pt-[38px] lg:hidden">
        <div onClick={() => router.push("/")}>
          <ArrowLeft />
        </div>
        <div className="flex w-full justify-between">
          <div className="flex-ic">
            <select
              className="font-['Pretendard'] text-[20px] font-bold leading-[23.87px] text-[#000000]"
              value={categoryTwo}
              onChange={(e) =>
                router.push({
                  pathname: "/productlist",
                  query: { categoryOne, categoryTwo: e.target.value },
                })
              }
            >
              {target.sub &&
                target.sub.map((continent, index) => (
                  <option key={index} value={continent.id}>
                    {continent.title}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <SearchOrangeMobile />
          </div>
        </div>
      </div>
      {/* mobile E*/}
      {/* 대륙 카테고리 E*/}

      <H_Separator mobileThick />

      {/* 나라 카테고리 S*/}
      <div className="flex w-full items-center lg:mt-[93px]">
        <div className="flex w-full max-w-[1320px] border-collapse flex-col overflow-hidden px-[30px] py-[15px] lg:py-0 lg:px-0">
          {/* 큰 카테고리 S*/}
          <div className="flex items-center justify-between  lg:justify-start">
            {secondTarget?.last &&
              [{ title: "전체", id: null }, ...secondTarget.last].map(
                (last, index: any) => (
                  <Link
                    key={index}
                    href={{
                      pathname: "/productlist",
                      query: {
                        categoryOne,
                        categoryTwo,
                        ...(last.id ? { categoryThree: last.id } : {}),
                      },
                    }}
                  >
                    <div
                      className={`box-border flex border-collapse cursor-pointer items-center justify-center lg:border-[#000000] lg:py-[20px] lg:px-[40px] ${
                        last.id === categoryThree
                          ? "lg:border-[2px]  lg:border-b-[2px] lg:border-b-[#fafafa]"
                          : "lg:border-b-[2px]"
                      } `}
                    >
                      <h1
                        className={`m-0 whitespace-nowrap font-['Pretendard'] text-[24px] font-semibold leading-[28.6px] ${
                          last.id === categoryThree
                            ? "text-[#ff5c00]"
                            : "text-[#7e7e7e]"
                        }`}
                      >
                        {last.title}
                      </h1>
                    </div>
                  </Link>
                )
              )}
            <div className="hidden w-full items-center py-[20px] px-[40px] lg:flex lg:border-b-[2px] lg:border-[#000000]">
              <h1 className="m-0 whitespace-nowrap font-['Pretendard'] text-[24px] font-semibold leading-[28.6px] text-[#000000] opacity-0">
                길이맞추기 텍스트
              </h1>
            </div>
          </div>
          {/* 큰 카테고리 E*/}
        </div>
      </div>
      {/* 나라 카테고리 E*/}

      <H_Separator mobileThick />
      {/* 결과 S */}
      <div className="flex flex-col ">
        {/* 필터 박스 S*/}
        <div className="hidden items-center justify-between lg:mt-[45px] lg:flex">
          {/* <div className="flex items-center">
            <span className="m-0 font-['Pretendard'] text-[13px] font-semibold leading-[15.51px] text-[#ababab] lg:text-[25px] lg:leading-[30px]">
              총 {productData?.result && productData.result.total}건
            </span>
          </div> */}
          {/* <div className="hidden items-center justify-center gap-[44px] lg:flex">
            {filterCategories.map((item, index) => (
              <span
                className="m-0  cursor-pointer font-['Pretendard'] text-[25px] font-semibold leading-[30px] text-[#ababab] "
                key={index}
                onClick={() => setCurrentCategory(index)}
              >
                {item}
              </span>
            ))}
          </div> */}

          {/* <select className="font-['Pretendard'] text-[13px] font-semibold leading-[15.51px] text-[#ababab] lg:hidden ">
            {filterCategories.map((item, index) => (
              <option
                key={index}
                className="font-['Pretendard'] text-[13px] font-semibold leading-[15.51px] text-[#ababab] "
              >
                {item}
              </option>
            ))}
          </select> */}
        </div>
        {/* 필터 박스 E*/}

        <div className="mt-[16px] hidden lg:block">
          <span className="  font-['Pretendard'] text-[30px] font-bold leading-[35.8px] text-[#6a6a6a] lg:visible">
            상품리스트
          </span>
        </div>

        {/* 결과 그리드 S */}
        {/* <div className="mt-[47px] hidden auto-rows-fr grid-cols-3 gap-[47px] lg:grid">
          {productData?.result?.data &&
            productData.result.data.map((d, index) => (
              <SearchResultCard
                key={index}
                data={{
                  name: d.name,
                  cubeezName: d.cubeez ? d.cubeez.name : '',
                  createdAt: formatDate(d.createdAt),
                  price: d.priceAdult,
                  category: "패키지 여행",
                  hashTags: d.tag.split(","),
                }}
              />
            ))}
        </div> */}

        <SearchResults
          data={
            productData?.result?.data
              ? productData.result.data
                  .filter((t) => t.status === "sale")
                  .map((d, index) => ({
                    name: d.name,
                    createdAt: formatDate(d.createdAt),
                    cubeezName: d.cubeez ? d.cubeez.name : "",
                    price: d.priceAdult,
                    category: "패키지 여행",
                    hashTags: d.tag.split(","),
                    id: d.id,
                    image:
                      d?.image && d.image.length > 0
                        ? (
                            d.image.find((a) => (a as any)?.isThumb) ||
                            d.image[0]
                          ).imageUrl
                        : "/images/tmp/product/1.png",
                  }))
              : []
          }
        />

        {/* <div className="mt-[71px] hidden items-center justify-center lg:flex ">
          <div
            className="flex  cursor-pointer items-center justify-center gap-[17px]"
            onClick={() => toggleShowMore()}
          >
            <span className="cur m-0 font-['Pretendard'] text-[24px] font-bold leading-[29px] text-[#717171]">
              더보기
            </span>
            <ChevronDown width="28px" height="14px" />
          </div>
        </div> */}

        {/* 결과 그리드 E*/}
      </div>
      {/* 결과 E */}

      <MobileBottomBar />
    </div>
  );
};

export default ProductList;
