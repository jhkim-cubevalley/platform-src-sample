import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";

import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import BoardTable from "../../../components/BoardTable";
import ColorBanner from "../../../components/ColorBanner";
import GapMaker from "../../../components/GapMaker";
import LeftRight from "../../../components/LeftRight";
import MainTable from "../../../components/MainTable";
import MainTitle from "../../../components/MainTitle";
import { Pagination } from "../../../components/Pagination";
import TopSearchBar from "../../../components/TopSearchBar";
import { secondArgsFetcher } from "../../../utils/api";
import {
  eachNoticeI,
  getEachNoticeAPI,
  getNoticeAPI,
} from "../../../utils/api/notice";
import { formatDate } from "../../../utils/formatDate";
import { queryFilter } from "../../../utils/queryFilter";
import useLogin, { useLoginCheck } from "../../../utils/useLogin";

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
const Notice: NextPage = () => {
  const { t } = useTranslation("common");

  const { query } = useRouter();
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(1);
  useEffect(() => {
    router.replace({
      query: {
        ...queryFilter(router.query),
        limit: 10,
        offset: pageIndex,
        status: "notice",
      },
    });
  }, []);
  const { data } = useSWR(
    ["/notice", queryFilter(query)],
    secondArgsFetcher(getNoticeAPI)
  );
  const { loginData } = useLogin();
  const [noticeList, setNoticeList] = useState<eachNoticeI[]>();
  useEffect(() => {
    console.log(loginData.login);
    let list = loginData.login
      ? data?.result.data.filter((v, i) => {
          return v.target === "user" || v.target === "all";
        })
      : data?.result.data.filter((v, i) => {
          return v.target === "all";
        });
    setNoticeList(list);
    console.log("result", list);
  }, [data?.result.data, loginData.login]);

  return (
    <div className="relative flex w-full flex-col items-center bg-[#FAFAFA]">
      {/* <TopSearchBar />
      <MainTitle mainTitle={"커뮤니티"} />
      <GapMaker height={137} /> */}

      <BoardTable>
        <colgroup>
          <col width={"20%"}></col>
          <col width={"60%"}></col>
          <col width={"20%"}></col>
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          {noticeList?.map((v, i) => (
            <tr
              style={{ cursor: "pointer" }}
              key={v.id}
              onClick={() => {
                Router.push({
                  pathname: `/community/notice/${v.id}`,
                  query: {
                    id: v.id,
                  },
                });
              }}
            >
              <td>{v.id}</td>
              <td>{v.title}</td>
              <td>{formatDate(v.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </BoardTable>
      <GapMaker height={130} />
      {data?.result.data && (
        <Pagination
          total={data.result.total}
          limit={8}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      )}
      <GapMaker height={130} />

      {/* <div className="w-full max-w-[1318px]">
        <div>
          <div className="border-y-2 border-t-black border-b-[#DBDBDB] p-[40px] text-[#545454] font-semibold text-[24px]">
            <div className="flex">
              <div className="flex w-1/5">{data?.result.id}</div>
              <div className="flex w-3/5">{data?.result.title}</div>
              <div className="flex w-1/5">
                {data?.result.createdAt && formatDate(data?.result.createdAt)}
              </div>
            </div>
          </div>
          <div className="border-b-2 border-b-black py-[75px] px-[40px] font-medium text-[24px] leading-[41px] text-[#474747]">
            <div>
              {data && (
                <div
                  dangerouslySetInnerHTML={{ __html: data?.result.content }}
                ></div>
              )}
            </div>
          </div>
        </div>
        <GapMaker height={67} />
        <div className="border-y-4 border-y-[#DBDBDB]  text-[#545454] font-semibold text-[24px]">
          <div className="flex p-[40px]">
            <div className="flex w-1/5">이전 글</div>
            <div className="flex w-1/5">1234</div>
            <div className="flex w-3/5">공지사항</div>
          </div>
          <div className="h-[2px] bg-[#DBDBDB]"></div>
          <div className="flex p-[40px]">
            <div className="flex w-1/5">다음 글</div>
            <div className="flex w-1/5">1234</div>
            <div className="flex w-3/5">공지사항</div>
          </div>
        </div>
        <GapMaker height={54} />
        <div className="w-full h-fit">
          <LeftRight>
            <div></div>
            <button
              className="w-fit"
              onClick={() => Router.push("/community/notice")}
            >
              <ColorBanner type={"black"}>목록</ColorBanner>
            </button>
          </LeftRight>
        </div>
        <GapMaker height={60} />
      </div> */}
    </div>
  );
};

export default Notice;
