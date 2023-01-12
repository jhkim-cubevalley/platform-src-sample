import Router from "next/router";
import useSWR from "swr";
import { getTosAPI } from "../utils/api/tos";
import { cls } from "../utils/cls";
import useIconPopup from "../utils/useIconPopup";
import { TermsContainer } from "./TermsBox";
import usePopup from "./usePopup";

const bottomLink = [
  {
    title: "회사소개",
    link: "https://www.cubevalley.net/board/14/49?pageNum=1",
  },
  {
    title: "이용약관",
    link: "/terms/use",
  },
  {
    title: "개인정보처리방침",
    link: "/terms/personalinfo",
  },
  {
    title: "여행약관",
    link: "/terms/travel",
  },
];

const infoButton = [
  {
    title: "나만의 여행 상담하기",
    link: "/page/incentive",
  },
  {
    title: "큐비즈 알아보기",
    link: "/page/cubeez",
  },
];

export const BottomInfo = () => {
  const { data, mutate } = useSWR("/tos", getTosAPI);
  const useTermsList = data?.result.filter((v, i) => {
    return v.type === "TOS";
  });
  const personalInfoDefaultList = data?.result.filter((v, i) => {
    return v.type === "PRIVACY";
  });

  const { component, openPopup, closePopup } = usePopup();
  const {
    component: bigComponent,
    openPopup: openBigPopup,
    closePopup: closeBigPopup,
  } = usePopup();
  const {
    openPopup: openIconPopup,
    closePopup: closeIconPopup,
    component: iconComponent,
  } = useIconPopup();
  return (
    <div className="flex w-full items-center justify-center bg-[#F5F5F5] pb-20">
      {component}
      {iconComponent}
      {bigComponent}
      <div className="w-full max-w-[1400px] divide-y">
        <div className="flex w-full items-center justify-between p-5 lg:px-8 lg:py-6">
          <div className="flex gap-5">
            {bottomLink.map((link) => (
              <div
                key={`bottomLink${link.title}`}
                className={cls(
                  "cursor-pointer text-xs font-bold text-[#4E4E4E] lg:text-lg",
                  link.link.startsWith("http") ? "hidden" : ""
                )}
                onClick={
                  link.title === "이용약관"
                    ? () => {
                        useTermsList &&
                          openPopup(
                            <TermsContainer
                              type="editDefault"
                              closePopup={closePopup}
                              openIconPopup={openIconPopup}
                              term={useTermsList[0]}
                            />
                          );
                      }
                    : link.title === "개인정보처리방침"
                    ? () => {
                        personalInfoDefaultList &&
                          openPopup(
                            <TermsContainer
                              type="editDefault"
                              closePopup={closePopup}
                              openIconPopup={openIconPopup}
                              term={personalInfoDefaultList[0]}
                            />
                          );
                      }
                    : () => Router.push(link.link)
                }
              >
                {link.title}
              </div>
            ))}
          </div>
          <div className="hidden gap-5 lg:flex">
            {infoButton.map((info) => (
              <button
                className="rounded border border-[#00192F] p-3 text-base font-semibold text-[#00192F]"
                key={`bottomBtn${info.title}`}
                onClick={() => Router.push(info.link)}
              >
                {info.title}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col p-5 text-[9px] font-normal lg:p-8 lg:text-sm">
          <div>상호: (주)큐브밸리 | 대표: 최지웅</div>
          <div>주소: 서울특별시 종로구 사직로8길 24, 1520호</div>
          <div>
            대표번호: 02-6959-5448 | 이메일: mcubetour@cubevalley.net | 팩스:
            02-6959-5449
          </div>
          <div>
            사업자등록번호: 603-81-91430 |
            통신판매업신고번호:제2020-서울종로-0430호
          </div>
        </div>
        <div className="p-5 text-[9px] font-normal text-[#707070] lg:p-8 lg:text-sm">
          Copyright @ (주)큐브밸리 All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default BottomInfo;
