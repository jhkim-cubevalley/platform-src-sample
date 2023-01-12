import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";

import { useRouter } from "next/router";
import TopSearchBar from "../../components/TopSearchBar";
import GapMaker from "../../components/GapMaker";
import { useLoginCheck } from "../../utils/useLogin";
import useSWR from "swr";
import { getHomeAPI } from "../../utils/api/home";
import { secondArgsFetcher } from "../../utils/api";
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
const Cubeez: NextPage = () => {
  const { t } = useTranslation("common");
  const { query } = useRouter();
  console.log(query);
  const { data, mutate } = useSWR(
    ["/home/content", "CUBEEZ"],
    secondArgsFetcher(getHomeAPI)
  );

  console.log(data?.result);
  return (
    <div className="relative flex w-full flex-col items-center bg-[#FAFAFA]">
      <TopSearchBar />
      <div className="mt-24 mb-4 flex w-full max-w-[800px] flex-col gap-1 px-5 lg:mb-10 lg:px-8">
        <div className="text-xl font-bold lg:mb-2 lg:text-[31px]">
          큐비즈란?
        </div>
      </div>
      <GapMaker height={24} />
      <div className="w-full max-w-[800px]">
        {data && (
          <div dangerouslySetInnerHTML={{ __html: data?.result.content }}></div>
        )}
      </div>
      <GapMaker height={48} />
    </div>
  );
};

export default Cubeez;
