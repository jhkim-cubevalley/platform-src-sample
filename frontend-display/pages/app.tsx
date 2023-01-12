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
import MainButton from "../components/MainButton";
import Link from "next/link";
import GapMaker from "../components/GapMaker";

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
  console.log(query);
  return (
    <div className="relative flex w-full flex-col items-center">
      <TopSearchBar />
      <GapMaker height={40} />
      <MainTitle mainTitle="iOS 앱 다운로드"></MainTitle>
      <div className="mb-10 w-[300px]">
        <Link
          href={
            "itms-services://?action=download-manifest&url=https://test.cubeez.kr/app/manifest.plist"
          }
        >
          <MainButton styleType="orange">다운로드</MainButton>
        </Link>
      </div>

      <MobileBottomBar />
    </div>
  );
};

export default Home;
