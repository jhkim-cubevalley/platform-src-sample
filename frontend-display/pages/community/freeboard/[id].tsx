import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";

import { useRouter } from "next/router";
import GapMaker from "../../../components/GapMaker";
import MainTitle from "../../../components/MainTitle";
import TopSearchBar from "../../../components/TopSearchBar";

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
const FreeBoardDetail: NextPage = () => {
  const { t } = useTranslation("common");
  const { query } = useRouter();
  console.log(query);

  return (
    <div className="w-full relative flex items-center flex-col bg-[#FAFAFA]">
      <TopSearchBar />
      <MainTitle mainTitle={"자유게시판"} />
      <GapMaker height={24} />
      <div className="w-full max-w-[1318px]"></div>
      <GapMaker height={24} />
      <GapMaker height={24} />
    </div>
  );
};

export default FreeBoardDetail;
