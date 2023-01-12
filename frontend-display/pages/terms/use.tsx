import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Router, { useRouter } from "next/router";
import MainTitle from "../../components/MainTitle";
import TopSearchBar from "../../components/TopSearchBar";
import GapMaker from "../../components/GapMaker";
import { TermsBox } from "../../components/TermsBox";
import { getTosAPI } from "../../utils/api/tos";
import useSWR from "swr";
// const personalInfoDefaultList = ["개인정보이용동의", "이용약관", "큐비즈 약관"];
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
  const useTermsList = data?.result.filter((v, i) => {
    return v.type === "TOS";
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
        <MainTitle mainTitle={"이용약관"} />
      </div>

      <GapMaker height={24} />

      <div className="w-full lg:flex lg:items-center lg:justify-center">
        <div className="flex w-full flex-wrap justify-center gap-3.5 px-8 lg:gap-24">
          {useTermsList?.map((v, i) => (
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
