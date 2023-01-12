import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";

import { useRouter } from "next/router";
import TopSearchBar from "../../components/TopSearchBar";
import GapMaker from "../../components/GapMaker";
import useSWR from "swr";
import { secondArgsFetcher } from "../../utils/api";
import { getHomeAPI } from "../../utils/api/home";
import MainTitle from "../../components/MainTitle";
import H_Category from "../../components/H_Category";
import Notice from "./notice";
import { useState } from "react";
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

export const communityType = ["공지사항", "자유게시판"];
const Community: NextPage = () => {
  const { t } = useTranslation("common");
  const { query } = useRouter();
  console.log(query);
  const [currentCategory, setCurrentCategory] = useState(-1);
  console.log(currentCategory);
  return (
    <div className="relative flex w-full flex-col items-center bg-[#FAFAFA]">
      <TopSearchBar />
      <MainTitle mainTitle={"커뮤니티"} />
      <GapMaker height={24} />

      <div className="w-full max-w-[1318px]">
        <H_Category
          categories={communityType}
          setCurrentCountry={setCurrentCategory}
          hasFull={false}
        />
      </div>
      <GapMaker height={130} />

      {currentCategory === -1 ? <Notice /> : <></>}
    </div>
  );
};

export default Community;
