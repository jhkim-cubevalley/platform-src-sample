import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { getMenuAPI } from "../utils/api/menu";
import { cls } from "../utils/cls";
import Notification from "./Notification";
import { useCategoryMenu } from "./TopMenuNavBar";
import usePopup from "./usePopup";

const cateNum = [4, 6, 4, 7, 5];

const category = ["시그니처", "테마", "국내여행", "해외여행", "커뮤니티"].map(
  (cate) => ({
    title: cate,
    sub: Array(5)
      .fill(0)
      .map((_, subI) => ({
        title: `${cate}${subI + 1}`,
        last: Array(cateNum[subI])
          .fill(0)
          .map((_, lastI) => ({
            title: `${cate}${subI + 1}-${lastI + 1}`,
          })),
      })),
  })
);

const alertOnSvg = (
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

const triangleSvg = (
  <svg
    width="7"
    height="5"
    viewBox="0 0 7 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.82296 4.22077C3.74401 4.30455 3.61082 4.30455 3.53187 4.22077L0.570547 1.07856C0.450292 0.950955 0.540758 0.741386 0.716096 0.741386L6.63874 0.741386C6.81407 0.741386 6.90454 0.950955 6.78429 1.07856L3.82296 4.22077Z"
      fill="#212121"
    />
  </svg>
);

export const useMobileMenu = () => {
  const [Open, setOpen] = useState(false);
  const [Selected, setSelected] = useState({ category: 0, sub: -1 });
  const { component: popupComponent, openPopup } = usePopup();
  useEffect(() => {
    setSelected({ category: 0, sub: -1 });
  }, [Open]);
  const leftCateClickHandler = (i: number) => {
    if (Selected.category !== i) {
      setSelected({ category: i, sub: -1 });
    }
  };
  const rightCateClickHandler = (i: number) => {
    if (Selected.sub !== i) {
      setSelected({ ...Selected, sub: i });
    } else {
      setSelected({ ...Selected, sub: -1 });
    }
  };
  // const { data, mutate } = useSWR("/menu", getMenuAPI);

  // const category = data?.result.data.map((cate) => ({
  //   title: cate.nameKo,
  //   sub: cate.next?.map((sub, subI) => ({
  //     title: sub.nameKo,
  //     last: sub.next?.map((last, lastI) => ({
  //       title: last.nameKo,
  //     })),
  //   })),
  // }));
  const { category } = useCategoryMenu();

  const component = (
    <div
      className={cls(
        "fixed left-0 top-0 z-30 h-full w-full bg-black bg-opacity-80",
        Open ? "" : "hidden"
      )}
      onClick={() => setOpen(false)}
    >
      {popupComponent}
      <div
        className={
          " left-0 top-0 flex h-full w-[80%] max-w-[400px] flex-col bg-white"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" flex w-full shrink-0 grow-0 flex-col justify-start gap-9 p-9">
          <div className="flex w-full items-center justify-between">
            <div className="relative h-5 w-full">
              <Image
                src={"/images/tmp/logo.png"}
                alt="큐브밸리 로고"
                layout="fill"
                objectFit="contain"
                objectPosition="left"
              />
            </div>

            {/* <button onClick={() => openPopup(<Notification />)}>
              <div>{alertOnSvg}</div>
            </button> */}
          </div>
          {/* <div className="flex flex-col gap-2">
            <div className=" text-xl font-bold text-[#00192F]">닉네임</div>
            <div className="text-[15px] font-normal text-[#848484]">
              abcdefg1000
            </div>
          </div> */}
        </div>
        <div className="flex h-10 w-full grow border-t border-[#DBDBDB]">
          <div className="flex w-2/5 flex-col bg-[#0025460A] pt-8">
            {category &&
              category.map((cate, i) => (
                <button
                  onClick={() => leftCateClickHandler(i)}
                  className={cls(
                    "w-full p-3 text-[17px]",
                    i === Selected.category
                      ? "bg-white font-semibold text-[#FF5C00]"
                      : "font-medium text-[#252525]"
                  )}
                  key={`mobilemenuleft${cate.title}${i}`}
                >
                  {cate.title}
                </button>
              ))}
          </div>
          <div className="flex w-3/5 flex-col divide-y-[1px] divide-[#F0F1F3] overflow-scroll pt-8 scrollbar-hide">
            {Selected.category >= 0 &&
              category &&
              category?.[Selected.category]?.sub &&
              category?.[Selected.category]?.sub?.map((sub, i) => (
                <div
                  key={`mobilemenuright${category[Selected.category].title}${
                    sub.title
                  }${i}`}
                  className="w-full flex-shrink-0 px-8"
                >
                  <button
                    className="w-full py-4"
                    onClick={() => rightCateClickHandler(i)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-[15px] font-semibold text-[#212121]">
                        {sub.title}
                      </div>
                      <div
                        className={cls(Selected.sub === i ? " rotate-180" : "")}
                      >
                        {triangleSvg}
                      </div>
                    </div>
                  </button>
                  <div
                    className={cls(
                      "flex w-full flex-col flex-nowrap gap-3 overflow-hidden",
                      Selected.sub === i ? "pt-1 pb-6" : "h-0 p-0"
                    )}
                  >
                    {sub?.last?.map((last, lastI) => (
                      <Link
                        key={`mobilemenurightsub${
                          category[Selected.category].title
                        }${sub.title}${i}${last.title}`}
                        href={{
                          pathname: "/productlist",
                          query: {
                            categoryOne: category[Selected.category].id,
                            categoryTwo: sub.id,
                            categoryThree: last.id,
                          },
                        }}
                      >
                        <div className="text-sm font-normal text-[#343434]">
                          {last.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
  return {
    component,
    Open,
    setOpen,
  };
};

export default useMobileMenu;
