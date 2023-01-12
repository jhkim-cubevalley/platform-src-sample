import type { NextPage } from "next";
import type { ImageProps } from "next/image";
import Head from "next/head";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import Test from "../components/Test";
import { cls } from "../utils/cls";
import { TouchEvent, useEffect, useRef, useState } from "react";
import TopSearchBar from "../components/TopSearchBar";
import MainBanner from "../components/MainBanner";
import MainTitle from "../components/MainTitle";
import { ProductCardRolling, productInfoI } from "../components/ProductCard";
import { CubeezCard, CubeezCardRolling } from "../components/CubeezCard";
import {
  FullImageCard,
  FullImageCardRolling,
} from "../components/FullImageCard";
import FullSingleBanner from "../components/FullSingleBanner";
import MobileBottomBar from "../components/MobileBottomBar";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import { getProductAPI } from "../utils/api/product";

export const dummyProductInfo: productInfoI[] = [
  {
    cubeezIcon: "/images/tmp/cubeezIcon.png",
    cubeezName: "큐비즈 이름",
    productName: "바캉스는 지중해지!",
    productImage: "/images/tmp/product/1.png",
    productPrice: 3000000,
    productTag: ["지중해", "유럽", "스페인", "패키지"],
    recommended: true,
  },
  {
    cubeezIcon: "/images/tmp/cubeezIcon.png",
    cubeezName: "큐비즈 이름",
    productName: "여유로운 나의여행, 벨기에 & 네덜란드",
    productImage: "/images/tmp/product/2.png",
    productPrice: 3000000,
    productTag: ["지중해", "유럽", "스페인", "패키지"],
  },
  {
    cubeezIcon: "/images/tmp/cubeezIcon.png",
    cubeezName: "큐비즈 이름",
    productName: "Bon Voyage, 언제나 좋은 스위스 12 Days",
    productImage: "/images/tmp/product/3.png",
    productPrice: 3000000,
    productTag: ["지중해", "유럽", "스페인", "패키지"],
    recommended: true,
  },
  {
    cubeezIcon: "/images/tmp/cubeezIcon.png",
    cubeezName: "큐비즈 이름",
    productName: "바캉스는 지중해지!",
    productImage: "/images/tmp/product/4.png",
    productPrice: 3000000,
    productTag: ["지중해", "유럽", "스페인", "패키지"],
  },
  {
    cubeezIcon: "/images/tmp/cubeezIcon.png",
    cubeezName: "큐비즈 이름",
    productName: "여유로운 나의여행, 벨기에 & 네덜란드",
    productImage: "/images/tmp/product/5.png",
    productPrice: 3000000,
    productTag: ["지중해", "유럽", "스페인", "패키지"],
    recommended: true,
  },
  {
    cubeezIcon: "/images/tmp/cubeezIcon.png",
    cubeezName: "큐비즈 이름",
    productName: "Bon Voyage, 언제나 좋은 스위스 12 Days",
    productImage: "/images/tmp/product/6.png",
    productPrice: 3000000,
    productTag: ["지중해", "유럽", "스페인", "패키지"],
  },
  {
    cubeezIcon: "/images/tmp/cubeezIcon.png",
    cubeezName: "큐비즈 이름",
    productName: "바캉스는 지중해지!",
    productImage: "/images/tmp/product/7.png",
    productPrice: 3000000,
    productTag: ["지중해", "유럽", "스페인", "패키지"],
    recommended: true,
  },
  {
    cubeezIcon: "/images/tmp/cubeezIcon.png",
    cubeezName: "큐비즈 이름",
    productName: "여유로운 나의여행, 벨기에 & 네덜란드",
    productImage: "/images/tmp/product/8.png",
    productPrice: 3000000,
    productTag: ["지중해", "유럽", "스페인", "패키지"],
  },
  {
    cubeezIcon: "/images/tmp/cubeezIcon.png",
    cubeezName: "큐비즈 이름",
    productName: "Bon Voyage, 언제나 좋은 스위스 12 Days",
    productImage: "/images/tmp/product/9.png",
    productPrice: 3000000,
    productTag: ["지중해", "유럽", "스페인", "패키지"],
    recommended: true,
  },
];

const Home: NextPage = () => {
  const { t } = useTranslation("common");
  const { query } = useRouter();
  const { data } = useSWR("/product", () => getProductAPI());
  console.log(query);
  return (
    <div className="relative flex w-full flex-col items-center">
      <TopSearchBar />
      <MainBanner
        imageUrl="https://d22flz0ijor4to.cloudfront.net/5e512409-78e8-451d-92cc-df0741d171a9.jpeg"
        tagList={["크루즈", "골프", "다뉴브강"]}
        link="/product/58"
      />
      <div className="z-[1] flex w-full max-w-[1464px] flex-col items-center rounded-3xl bg-white lg:px-8">
        <MainTitle
          mainTitle="큐브밸리 베스트셀러"
          subTitle="가장 많은 사람들이 선택한 여행 상품을 둘러보세요"
        />
        <ProductCardRolling
          centerLarge
          productList={
            data?.result?.data
              ? [...data.result.data, ...data.result.data]
                  .filter((t) => t.status === "sale")
                  .map((t) => ({
                    cubeezIcon: "/images/tmp/cubeezIcon.png",
                    cubeezName: t.cubeez ? t.cubeez.nickname : "",
                    productName: t.name,
                    productImage:
                      t?.image && t.image.length > 0
                        ? (
                            t.image.find((a) => (a as any)?.isThumb) ||
                            t.image[0]
                          ).imageUrl
                        : "/images/tmp/product/1.png",
                    productPrice: t.priceAdult || 0,
                    productTag: t.tag.split(","),
                    recommended: true,
                    id: t.id,
                  }))
              : []
          }
        />
        {/* <MainTitle
          mainTitle="오늘의 큐비즈"
          subTitle="인기있는 큐비즈와 그들이 제안하는 즐거운 여행을 둘러보세요"
        />
        <CubeezCardRolling
          cubeezList={Array(10)
            .fill(0)
            .map((_, i) => ({
              cubeezIcon: "/images/tmp/cubeezIcon.png",
              cubeezName: `큐비즈 이름${i}`,
              cubeezTag: "대표태그",
              cubeezDesc:
                "한줄소개 텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스",
            }))}
        />
        <div className="h-16 lg:h-36"></div>
        <FullImageCardRolling
          cardInfoList={Array(9)
            .fill(0)
            .map((_, i) => ({
              imageUrl: `/images/tmp/product/${i + 1}.png`,
              mainTitle: `이벤트 제목제목 ${i + 1}`,
              subTitle:
                "이벤트 내용입니다. 이벤트 내용입니다. 이벤트 내용입니다. 이벤트 내용입니다. 이벤트 내용입니다.  이벤트 내용입니다. ",
            }))}
        />
        <MainTitle
          mainTitle="큐브밸리가 추천하는 올여름 여행"
          subTitle="2022 트렌드를 반영한 여름 저격 여행 패키지를 만나보세요"
        />
        <ProductCardRolling
          productList={[
            ...dummyProductInfo.slice(3),
            ...dummyProductInfo.slice(0, 3),
          ]}
        />
        <MainTitle
          mainTitle="따끈따끈 신상 여행지"
          subTitle="이번달 신상 여행 상품의 첫 주인공이 되어보세요"
        />
        <ProductCardRolling
          productList={[
            ...dummyProductInfo.slice(6),
            ...dummyProductInfo.slice(0, 6),
          ]}
        />*/}
        <div className="h-16 lg:h-36"></div>
        <FullSingleBanner
          info={{
            imageUrl: "/images/tmp/fullSingleBanner.png",
            mainTitle: "큐비즈 알아보기",
            subTitle: "큐비즈 안내 설명",
            href: "/page/cubeez",
          }}
        />
        <div className="h-16 lg:h-36"></div>
      </div>
      <MobileBottomBar />
    </div>
  );
};

export default Home;
