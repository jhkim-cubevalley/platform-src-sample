import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { ReactElement, useEffect, useState } from "react";
import useSWR from "swr";
import { eachMenuI, getMenuAPI } from "../utils/api/menu";
import { cls } from "../utils/cls";
import Notification from "./Notification";
import useLoginPopup from "./useLoginPopup";
import usePopup from "./usePopup";
import { NextRouter, Router, useRouter } from "next/router";
import useLogin, { useLoginInfo, useSetLogin } from "../utils/useLogin";
import Link from "next/link";
import LeftRight from "./LeftRight";

export const alertOffSvg = (
  <svg
    width="33"
    height="35"
    viewBox="0 0 33 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.40736 20.1554L3.41837 20.1283V20.099V13.1674C3.41837 6.07866 9.25309 0.328223 16.4554 0.328223C23.6577 0.328223 29.4923 6.07866 29.4923 13.1674V20.099V20.1283L29.5033 20.1554L32.3292 27.1208L32.3292 27.1209C32.4906 27.5184 32.4413 27.969 32.1972 28.3242C31.953 28.6794 31.5449 28.8931 31.1076 28.8931H22.3162H22.1662V29.0431C22.1662 32.1575 19.6226 34.6661 16.4553 34.6661C13.288 34.6661 10.7444 32.1575 10.7444 29.0431V28.8931H10.5944H1.80311C1.3658 28.8931 0.957825 28.6794 0.713523 28.3242C0.469407 27.969 0.420166 27.5184 0.581502 27.1208L0.442509 27.0644L0.581505 27.1208L3.40736 20.1554ZM19.5358 29.0431V28.8931H19.3858H13.5249H13.3749V29.0431C13.3749 30.7333 14.7451 32.0796 16.4553 32.0796C18.1656 32.0796 19.5358 30.7333 19.5358 29.0431ZM26.9555 20.8559L26.9555 20.8559C26.8936 20.7034 26.8619 20.5408 26.8619 20.3767V13.1674C26.8619 7.50287 22.2006 2.91471 16.4554 2.91471C10.7101 2.91471 6.04881 7.50287 6.04881 13.1674V20.3767C6.04881 20.5408 6.01705 20.7034 5.9552 20.8559L3.82755 26.1002L3.74381 26.3066H3.96654H28.944H29.1667L29.083 26.1002L26.9555 20.8559Z"
      fill="white"
      fillOpacity="0.63"
    />
    <path
      d="M3.40736 20.1554L3.41837 20.1283V20.099V13.1674C3.41837 6.07866 9.25309 0.328223 16.4554 0.328223C23.6577 0.328223 29.4923 6.07866 29.4923 13.1674V20.099V20.1283L29.5033 20.1554L32.3292 27.1208L32.3292 27.1209C32.4906 27.5184 32.4413 27.969 32.1972 28.3242C31.953 28.6794 31.5449 28.8931 31.1076 28.8931H22.3162H22.1662V29.0431C22.1662 32.1575 19.6226 34.6661 16.4553 34.6661C13.288 34.6661 10.7444 32.1575 10.7444 29.0431V28.8931H10.5944H1.80311C1.3658 28.8931 0.957825 28.6794 0.713523 28.3242C0.469407 27.969 0.420166 27.5184 0.581502 27.1208L0.442509 27.0644L0.581505 27.1208L3.40736 20.1554ZM19.5358 29.0431V28.8931H19.3858H13.5249H13.3749V29.0431C13.3749 30.7333 14.7451 32.0796 16.4553 32.0796C18.1656 32.0796 19.5358 30.7333 19.5358 29.0431ZM26.9555 20.8559L26.9555 20.8559C26.8936 20.7034 26.8619 20.5408 26.8619 20.3767V13.1674C26.8619 7.50287 22.2006 2.91471 16.4554 2.91471C10.7101 2.91471 6.04881 7.50287 6.04881 13.1674V20.3767C6.04881 20.5408 6.01705 20.7034 5.9552 20.8559L3.82755 26.1002L3.74381 26.3066H3.96654H28.944H29.1667L29.083 26.1002L26.9555 20.8559Z"
      fill="#00192F"
    />
    <path
      d="M3.40736 20.1554L3.41837 20.1283V20.099V13.1674C3.41837 6.07866 9.25309 0.328223 16.4554 0.328223C23.6577 0.328223 29.4923 6.07866 29.4923 13.1674V20.099V20.1283L29.5033 20.1554L32.3292 27.1208L32.3292 27.1209C32.4906 27.5184 32.4413 27.969 32.1972 28.3242C31.953 28.6794 31.5449 28.8931 31.1076 28.8931H22.3162H22.1662V29.0431C22.1662 32.1575 19.6226 34.6661 16.4553 34.6661C13.288 34.6661 10.7444 32.1575 10.7444 29.0431V28.8931H10.5944H1.80311C1.3658 28.8931 0.957825 28.6794 0.713523 28.3242C0.469407 27.969 0.420166 27.5184 0.581502 27.1208L0.442509 27.0644L0.581505 27.1208L3.40736 20.1554ZM19.5358 29.0431V28.8931H19.3858H13.5249H13.3749V29.0431C13.3749 30.7333 14.7451 32.0796 16.4553 32.0796C18.1656 32.0796 19.5358 30.7333 19.5358 29.0431ZM26.9555 20.8559L26.9555 20.8559C26.8936 20.7034 26.8619 20.5408 26.8619 20.3767V13.1674C26.8619 7.50287 22.2006 2.91471 16.4554 2.91471C10.7101 2.91471 6.04881 7.50287 6.04881 13.1674V20.3767C6.04881 20.5408 6.01705 20.7034 5.9552 20.8559L3.82755 26.1002L3.74381 26.3066H3.96654H28.944H29.1667L29.083 26.1002L26.9555 20.8559Z"
      stroke="#FAFAFA"
      strokeWidth="0.3"
    />
  </svg>
);

export const alertOnSvg = (
  <svg
    width="33"
    height="37"
    viewBox="0 0 33 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.40736 22.1554L3.41837 22.1283V22.099V15.1674C3.41837 8.07866 9.25309 2.32822 16.4554 2.32822C23.6577 2.32822 29.4923 8.07866 29.4923 15.1674V22.099V22.1283L29.5033 22.1554L32.3292 29.1208L32.3292 29.1209C32.4906 29.5184 32.4413 29.969 32.1972 30.3242C31.953 30.6794 31.5449 30.8931 31.1076 30.8931H22.3162H22.1662V31.0431C22.1662 34.1575 19.6226 36.6661 16.4553 36.6661C13.288 36.6661 10.7444 34.1575 10.7444 31.0431V30.8931H10.5944H1.80311C1.36582 30.8931 0.957862 30.6794 0.713556 30.3243C0.469411 29.969 0.420158 29.5184 0.581502 29.1208L0.442509 29.0644L0.581505 29.1208L3.40736 22.1554ZM19.5358 31.0431V30.8931H19.3858H13.5249H13.3749V31.0431C13.3749 32.7333 14.7451 34.0796 16.4553 34.0796C18.1656 34.0796 19.5358 32.7333 19.5358 31.0431ZM26.9555 22.8559L26.9555 22.8559C26.8936 22.7034 26.8619 22.5408 26.8619 22.3767V15.1674C26.8619 9.50287 22.2006 4.91471 16.4554 4.91471C10.7101 4.91471 6.04881 9.50287 6.04881 15.1674V22.3767C6.04881 22.5408 6.01705 22.7034 5.9552 22.8559L3.82755 28.1002L3.74381 28.3066H3.96654H28.944H29.1667L29.083 28.1002L26.9555 22.8559Z"
      fill="white"
      fillOpacity="0.63"
    />
    <path
      d="M3.40736 22.1554L3.41837 22.1283V22.099V15.1674C3.41837 8.07866 9.25309 2.32822 16.4554 2.32822C23.6577 2.32822 29.4923 8.07866 29.4923 15.1674V22.099V22.1283L29.5033 22.1554L32.3292 29.1208L32.3292 29.1209C32.4906 29.5184 32.4413 29.969 32.1972 30.3242C31.953 30.6794 31.5449 30.8931 31.1076 30.8931H22.3162H22.1662V31.0431C22.1662 34.1575 19.6226 36.6661 16.4553 36.6661C13.288 36.6661 10.7444 34.1575 10.7444 31.0431V30.8931H10.5944H1.80311C1.36582 30.8931 0.957862 30.6794 0.713556 30.3243C0.469411 29.969 0.420158 29.5184 0.581502 29.1208L0.442509 29.0644L0.581505 29.1208L3.40736 22.1554ZM19.5358 31.0431V30.8931H19.3858H13.5249H13.3749V31.0431C13.3749 32.7333 14.7451 34.0796 16.4553 34.0796C18.1656 34.0796 19.5358 32.7333 19.5358 31.0431ZM26.9555 22.8559L26.9555 22.8559C26.8936 22.7034 26.8619 22.5408 26.8619 22.3767V15.1674C26.8619 9.50287 22.2006 4.91471 16.4554 4.91471C10.7101 4.91471 6.04881 9.50287 6.04881 15.1674V22.3767C6.04881 22.5408 6.01705 22.7034 5.9552 22.8559L3.82755 28.1002L3.74381 28.3066H3.96654H28.944H29.1667L29.083 28.1002L26.9555 22.8559Z"
      fill="#00192F"
    />
    <path
      d="M3.40736 22.1554L3.41837 22.1283V22.099V15.1674C3.41837 8.07866 9.25309 2.32822 16.4554 2.32822C23.6577 2.32822 29.4923 8.07866 29.4923 15.1674V22.099V22.1283L29.5033 22.1554L32.3292 29.1208L32.3292 29.1209C32.4906 29.5184 32.4413 29.969 32.1972 30.3242C31.953 30.6794 31.5449 30.8931 31.1076 30.8931H22.3162H22.1662V31.0431C22.1662 34.1575 19.6226 36.6661 16.4553 36.6661C13.288 36.6661 10.7444 34.1575 10.7444 31.0431V30.8931H10.5944H1.80311C1.36582 30.8931 0.957862 30.6794 0.713556 30.3243C0.469411 29.969 0.420158 29.5184 0.581502 29.1208L0.442509 29.0644L0.581505 29.1208L3.40736 22.1554ZM19.5358 31.0431V30.8931H19.3858H13.5249H13.3749V31.0431C13.3749 32.7333 14.7451 34.0796 16.4553 34.0796C18.1656 34.0796 19.5358 32.7333 19.5358 31.0431ZM26.9555 22.8559L26.9555 22.8559C26.8936 22.7034 26.8619 22.5408 26.8619 22.3767V15.1674C26.8619 9.50287 22.2006 4.91471 16.4554 4.91471C10.7101 4.91471 6.04881 9.50287 6.04881 15.1674V22.3767C6.04881 22.5408 6.01705 22.7034 5.9552 22.8559L3.82755 28.1002L3.74381 28.3066H3.96654H28.944H29.1667L29.083 28.1002L26.9555 22.8559Z"
      stroke="#FAFAFA"
      strokeWidth="0.3"
    />
    <circle cx="26.2731" cy="7.01427" r="6.72716" fill="#FF5C00" />
  </svg>
);

const searchSvg = (
  <svg
    width="21"
    height="22"
    viewBox="0 0 21 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.8448 14.526C16.7601 11.5224 16.7601 6.65283 13.8448 3.64921C10.9295 0.645577 6.2032 0.645577 3.28791 3.64921C0.372626 6.65283 0.372626 11.5224 3.28791 14.526C6.2032 17.5296 10.9295 17.5296 13.8448 14.526V14.526Z"
      stroke="#A5A5A5"
      strokeWidth="1.77882"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.8448 14.526C16.7601 11.5224 16.7601 6.65283 13.8448 3.64921C10.9295 0.645577 6.2032 0.645577 3.28791 3.64921C0.372626 6.65283 0.372626 11.5224 3.28791 14.526C6.2032 17.5296 10.9295 17.5296 13.8448 14.526V14.526Z"
      stroke="#A5A5A5"
      strokeWidth="1.77882"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.2864 14.9815L19.7554 20.6162"
      stroke="#A5A5A5"
      strokeWidth="1.77882"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const menuSvg = (
  <svg
    width="17"
    height="12"
    viewBox="0 0 17 12"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 11.7129H16.5V9.87956H0V11.7129ZM0 7.12956H16.5V5.29622H0V7.12956ZM0 0.712891V2.54622H16.5V0.712891H0Z" />
  </svg>
);

const rightSvg = (
  <svg
    width="9"
    height="17"
    viewBox="0 0 9 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1.71289L8 8.71289L1 15.7129"
      stroke="#FF5C00"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const arrowDownSvg = (
  <svg
    width="15"
    height="8"
    viewBox="0 0 15 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L7.5 7L14 1"
      stroke="#A5A5A5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const MypageModal = ({
  loginData,
  click,
  router,
  setLogin,
}: {
  loginData: useLoginInfo;
  click: boolean;
  router: NextRouter;
  setLogin: (
    info?:
      | {
          token: string;
        }
      | undefined
  ) => void;
}) => {
  return (
    <div className="absolute top-24 z-50 m-0 flex w-full max-w-[1384px] items-center justify-center p-0">
      <LeftRight>
        <div></div>
        <div
          className={cls(
            " relative right-[74px] z-50 flex w-fit flex-col items-center rounded-[5px] border border-[#EEEEEE] bg-white text-[15px] font-medium leading-[18px] text-[#B6B6B6]",
            click ? "" : "hidden"
          )}
        >
          <div className=" flex h-[74px] w-[196px] items-center justify-center whitespace-nowrap border-b border-b-[#EEEEEE]">
            <span className=" font-semibold ">
              {loginData.login &&
                loginData.info.name + "(" + loginData.info.nickname + ")"}
            </span>
            <span>님 환영합니다.</span>
          </div>
          <button
            onClick={() => {
              loginData.login &&
                router.replace(`/mypage/${loginData.info.uid}`);
            }}
          >
            <div className="flex h-[45px] w-[196px] items-center justify-center border-b border-b-[#EEEEEE]">
              마이페이지
            </div>
          </button>
          <button
            onClick={() => {
              setLogin();
              router.replace("/");
            }}
          >
            <div className="flex h-[48px] w-[196px] items-center justify-center">
              로그아웃
            </div>
          </button>
        </div>
      </LeftRight>
    </div>
  );
};
const TopMenuEach = (props: {
  children: ReactElement | ReactElement[];
  title: string | ReactElement;
}) => {
  const router = useRouter();
  const { children, title } = props;

  return (
    <div className="group flex h-full items-center justify-center">
      <div className="border-b-[3px] border-transparent fill-[#B6B6B6] px-1 py-4 text-[17px] text-[#B6B6B6] group-hover:border-b-[#00192F] group-hover:fill-[#00192F] group-hover:font-bold group-hover:text-[#00192F]">
        <button
          onClick={() => {
            title === "커뮤니티"
              ? router.push("/community")
              : title === "해외여행"
              ? router.push("/productlist")
              : "";
          }}
        >
          {title}
        </button>
      </div>
      <div className="absolute left-0 top-[80px] z-20 hidden w-full items-center justify-center border-b bg-white group-hover:flex">
        {children}
      </div>
    </div>
  );
};

const checkPriority = (a: eachMenuI, b: eachMenuI) => a.priority - b.priority;

export const useCategoryMenu = () => {
  const { data, mutate } = useSWR("/menu", getMenuAPI);
  const sorted = data?.result?.data
    ? data?.result.data.sort((a, b) => a.depth - b.depth)
    : [];
  const p1 = sorted
    .filter((v, i) => v.isEnable && v.depth === 1)
    .sort(checkPriority);
  const p2 = sorted
    .filter((v, i) => v.isEnable && v.depth === 2)
    .sort(checkPriority);
  const p3 = sorted
    .filter((v, i) => v.isEnable && v.depth === 3)
    .sort(checkPriority);
  // console.log({ p1, p2, p3 });
  const result = p1.map((t1) => ({
    title: t1.nameKo,
    id: t1.id,
    sub: p2
      .filter((t2) => t2.parent && t2.parent.id === t1.id)
      .map((t2) => ({
        title: t2.nameKo,
        id: t2.id,
        last: p3
          .filter((t3) => t3.parent && t3.parent.id === t2.id)
          .map((t3) => ({
            title: t3.nameKo,
            id: t3.id,
          })),
      })),
  }));
  return { category: result };
};

export const TopMenuNavBar = () => {
  const [Alert, setAlert] = useState(true);
  const [Selected, setSelected] = useState(0);
  const { component, openLogin } = useLoginPopup();
  const { component: popupComponent, openPopup } = usePopup();
  const { t } = useTranslation("common");
  const router = useRouter();
  const { loginData } = useLogin();
  const setLogin = useSetLogin();
  const { category } = useCategoryMenu();
  const [click, setClick] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="relative hidden h-24 w-full items-center justify-center lg:flex">
      {component}
      {popupComponent}
      <div className="flex h-full w-full max-w-[1384px] items-center justify-between px-8">
        <div
          className="relative h-full w-24 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src={"/images/tmp/logo.png"}
            alt="큐브밸리 로고"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="flex h-full gap-10">
          <TopMenuEach
            title={
              <div className="flex items-center gap-2">{menuSvg}전체메뉴</div>
            }
          >
            <div className="flex h-full w-full max-w-[1320px] divide-x border-t">
              <div className="flex w-40 flex-shrink-0 flex-col px-10 py-5">
                {category &&
                  category.map((cate, i) => (
                    <button
                      className={cls(
                        "flex items-center gap-3 whitespace-nowrap py-3 text-base font-semibold",
                        Selected === i ? "text-[#FF5C00]" : "text-[#949494]"
                      )}
                      key={`eachcatefull${i}`}
                      onClick={() => setSelected(i)}
                    >
                      <>
                        {cate.title}
                        {Selected === i && rightSvg}
                      </>
                    </button>
                  ))}
              </div>
              {category?.[Selected]?.sub &&
                category[Selected].sub?.map((sub, i) => (
                  <div
                    key={`eachcatefull${Selected}sub${i}`}
                    className="flex w-full flex-col gap-4 p-9"
                  >
                    <Link
                      href={{
                        pathname: "/productlist",
                        query: {
                          categoryOne: category[Selected].id,
                          categoryTwo: sub.id,
                        },
                      }}
                    >
                      <div className="mb-4 hover:cursor-pointer">
                        {sub.title}
                      </div>
                    </Link>
                    {sub?.last?.map((last, lastI) => (
                      <Link
                        href={{
                          pathname: "/productlist",
                          query: {
                            categoryOne: category[Selected].id,
                            categoryTwo: sub.id,
                            categoryThree: last.id,
                          },
                        }}
                        key={`eachcatefull${Selected}sub${i}last${lastI}`}
                      >
                        <div className="text-sm text-[#8E8E8E] hover:cursor-pointer">
                          {last.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
            </div>
          </TopMenuEach>
          {category &&
            category.map((cate) => (
              <TopMenuEach title={cate.title} key={`cate${cate.title}`}>
                <div className="flex h-full w-full max-w-[1320px]">
                  {cate.sub?.map((sub) => (
                    <div
                      key={`cate${cate.title}${sub.title}`}
                      className="flex w-full flex-col items-center gap-4 border-t py-6"
                    >
                      <Link
                        href={{
                          pathname: "/productlist",
                          query: {
                            categoryOne: cate.id,
                            categoryTwo: sub.id,
                          },
                        }}
                      >
                        <div className="text-base font-bold text-[#6F6F6F] hover:cursor-pointer">
                          {sub.title}
                        </div>
                      </Link>
                      <div className="h-[1px] w-full bg-[#EEEEEE]" />
                      {sub?.last?.map((last) => (
                        <Link
                          key={`cate${cate.title}${sub.title}${last.title}`}
                          href={{
                            pathname: "/productlist",
                            query: {
                              categoryOne: cate.id,
                              categoryTwo: sub.id,
                              categoryThree: last.id,
                            },
                          }}
                        >
                          <div className="text-base font-normal text-[#212121] hover:cursor-pointer">
                            {last.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </TopMenuEach>
            ))}
        </div>
        <div className="flex h-full items-center gap-7">
          <form
            className=" relative h-9 w-44"
            onSubmit={(e) => {
              e.preventDefault();
              if (searchTerm) {
                router.push(`/searchresults/${searchTerm}`);
                setSearchTerm("");
              }
            }}
          >
            <input
              type="text"
              className="h-full w-full rounded bg-[#EFEFEF] pl-11 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute top-2 left-3">
              {searchSvg}
            </button>
          </form>
          <button
            onClick={
              loginData.login ? () => setClick(!click) : () => openLogin()
            }
            className="flex text-xl font-bold text-[#313131]"
          >
            <div className="flex items-center justify-center gap-[10px] text-[15px] font-medium leading-[18px] text-[#B6B6B6]">
              {loginData.login
                ? loginData.info.name + "(" + loginData.info.nickname + ")"
                : "로그인"}
              {loginData.login && <div>{arrowDownSvg}</div>}
            </div>
          </button>

          <button onClick={() => openPopup(<Notification />)}>
            {Alert ? alertOnSvg : alertOffSvg}
          </button>
        </div>
      </div>
      {loginData.login && (
        <MypageModal
          loginData={loginData}
          click={click}
          router={router}
          setLogin={setLogin}
        />
      )}
    </div>
  );
};

export default TopMenuNavBar;
