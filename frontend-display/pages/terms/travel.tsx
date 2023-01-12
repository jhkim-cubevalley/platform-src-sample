import type { NextPage } from "next";
import type { ImageProps } from "next/image";
import Head from "next/head";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

import { TouchEvent, useEffect, useRef, useState } from "react";

import Router, { useRouter } from "next/router";
import { CubeezCardRolling } from "../../components/CubeezCard";
import { FullImageCardRolling } from "../../components/FullImageCard";
import FullSingleBanner from "../../components/FullSingleBanner";
import MainBanner from "../../components/MainBanner";
import MainTitle from "../../components/MainTitle";
import MobileBottomBar from "../../components/MobileBottomBar";
import { leftSvg, ProductCardRolling } from "../../components/ProductCard";
import TopSearchBar from "../../components/TopSearchBar";
import GapMaker from "../../components/GapMaker";
import { TermsBox } from "../../components/TermsBox";
import useSWR from "swr";
import { getTosAPI } from "../../utils/api/tos";
// const travelDefaultList = [
//   "국내여행표준약관",
//   "해외여행표준약관",
//   "국내여행특별약관",
//   "해외여행특별약관",
//   "자유여행약관",
// ];
export const leftArrowSvg = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 8H1M1 8L8 15M1 8L8 1"
      stroke="#2B2B2B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const TravelTerms: NextPage = () => {
  const { t } = useTranslation("common");
  const { query } = useRouter();
  console.log(query);
  const { data, mutate } = useSWR("/tos", getTosAPI);
  const travelDefaultList = data?.result.filter((v, i) => {
    return v.type === "TRIP";
  });
  return (
    <div className="relative flex w-full flex-col items-center bg-[#FAFAFA]">
      <div className="relative hidden w-full flex-col items-center bg-[#FAFAFA] lg:visible">
        <TopSearchBar />
      </div>
      <div className=" relative w-full flex-col items-center bg-[#FAFAFA] lg:hidden">
        <div
          className="absolute top-8 left-10 cursor-pointer"
          onClick={() => Router.back()}
        >
          {leftArrowSvg}
        </div>
      </div>
      <div className="mt-7 w-full border-b-8 border-[#EFEFEF] pl-5 lg:border-0">
        <MainTitle mainTitle={"여행 약관"} />
      </div>

      <GapMaker height={24} />

      <div className="w-full max-w-[1400px] lg:flex lg:items-center lg:justify-center">
        <div className="flex w-full flex-wrap justify-center gap-3.5 px-8 lg:gap-24">
          {travelDefaultList?.map((v, i) => (
            <TermsBox term={v} key={i} />
          ))}
        </div>
      </div>
      <GapMaker height={24} />
      <GapMaker height={24} />
    </div>
  );
};

export default TravelTerms;
