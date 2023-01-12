import { useState } from "react";
import { cls } from "../utils/cls";

const homeSvg = (
  <svg
    width="22"
    height="26"
    viewBox="0 0 22 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.9786 23.3934C20.9786 24.3259 20.2206 25.0839 19.2881 25.0839H2.69045C1.76401 25.0839 1 24.3259 1 23.3934V10.1826C1 9.25017 1.61362 8.047 2.37161 7.49956L9.62069 2.24774C10.3727 1.7003 11.6059 1.7003 12.3579 2.24774L19.607 7.49956C20.359 8.047 20.9786 9.25017 20.9786 10.1826V23.3994V23.3934Z"
      strokeWidth="1.80475"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.4723 18.9965C14.4723 17.0709 12.9095 15.5175 10.9839 15.5175C9.05836 15.5175 7.50488 17.0802 7.50488 18.9965V25.0429H14.4723V18.9965V18.9965Z"
      strokeWidth="1.80475"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const paperSvg = (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.05058 18.917V20.4443C7.05058 22.142 5.72522 23.5179 4.05273 23.6252C4.12216 23.6252 4.18527 23.6441 4.25469 23.6441H19.9887C21.7558 23.6441 23.1885 22.2115 23.1885 20.4443V18.917H7.05058Z"
      strokeWidth="1.55421"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.9067 18.9166V1.27026H1.69873V21.0939C1.69873 22.4382 2.73378 23.5238 4.05283 23.6311"
      strokeWidth="1.55421"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.84473 23.6505H4.24865C4.17922 23.6505 4.11611 23.6379 4.04669 23.6316C3.97726 23.6316 3.91415 23.6505 3.84473 23.6505V23.6505Z"
      strokeWidth="1.55421"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.49512 7.03833H9.01962"
      strokeWidth="1.55421"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.49512 11.1404H14.3842"
      strokeWidth="1.55421"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const mapSvg = (
  <svg
    width="28"
    height="29"
    viewBox="0 0 28 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_581_1160)">
      <path
        d="M14.0951 24.1094C19.6637 24.1094 24.178 19.5951 24.178 14.0265C24.178 8.45786 19.6637 3.9436 14.0951 3.9436C8.52647 3.9436 4.01221 8.45786 4.01221 14.0265C4.01221 19.5951 8.52647 24.1094 14.0951 24.1094Z"
        strokeWidth="1.55421"
        strokeLinejoin="round"
      />
      <path
        d="M14.0947 17.701C16.1239 17.701 17.769 16.0559 17.769 14.0267C17.769 11.9974 16.1239 10.3524 14.0947 10.3524C12.0654 10.3524 10.4204 11.9974 10.4204 14.0267C10.4204 16.0559 12.0654 17.701 14.0947 17.701Z"
        strokeWidth="1.55421"
        strokeLinejoin="round"
      />
      <path
        d="M14.0952 3.94381V0.696777"
        strokeWidth="1.55421"
        strokeLinejoin="round"
      />
      <path
        d="M4.01217 14.0269H0.765137"
        strokeWidth="1.55421"
        strokeLinejoin="round"
      />
      <path
        d="M14.0952 24.1097V27.3568"
        strokeWidth="1.55421"
        strokeLinejoin="round"
      />
      <path
        d="M24.1782 14.0269H27.4253"
        strokeWidth="1.55421"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_581_1160">
        <rect
          width="27.6297"
          height="27.6297"
          transform="translate(0.280273 0.645508)"
        />
      </clipPath>
    </defs>
  </svg>
);

const messageSvg = (
  <svg
    width="28"
    height="25"
    viewBox="0 0 28 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.82 0.972046H4.7364C2.81676 0.972046 1.25879 2.38211 1.25879 4.11951V13.8766C1.25879 15.614 2.81676 17.0241 4.7364 17.0241H8.90954V23.9485L14.8354 17.0241H22.82C24.7396 17.0241 26.2976 15.614 26.2976 13.8766V4.11951C26.2976 2.38211 24.7396 0.972046 22.82 0.972046Z"
      strokeWidth="1.55421"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const personSvg = (
  <svg
    width="19"
    height="29"
    viewBox="0 0 19 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.4469 15.3103C15.0011 15.1461 14.524 15.0522 14.0157 15.0522H5.17857C2.87934 15.0522 1.01807 16.9135 1.01807 19.2127V27.2366H18.1762V19.2127C18.1762 17.4219 17.0344 15.889 15.4469 15.3103V15.3103Z"
      strokeWidth="1.55421"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.4068 6.49368C14.4068 9.15265 12.2562 11.3033 9.5972 11.3033C6.93823 11.3033 4.7876 9.15265 4.7876 6.49368C4.7876 3.83472 6.93823 1.68408 9.5972 1.68408C12.2562 1.68408 14.4068 3.83472 14.4068 6.49368Z"
      strokeWidth="1.55421"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const navList = [
  {
    text: "홈",
    icon: homeSvg,
  },
  {
    text: "MD 기획",
    icon: paperSvg,
  },
  {
    text: "여행 찾기",
    icon: mapSvg,
  },
  {
    text: "알림메시지",
    icon: messageSvg,
  },
  {
    text: "마이페이지",
    icon: personSvg,
  },
];

export const MobileBottomBar = () => {
  const [Selected, setSelected] = useState(0);
  const buttonClickHandler = (i: number) => {
    setSelected(i);
  };
  return (
    <div className="fixed bottom-0 z-[100] hidden w-full border-t border-[#CFCFCF] bg-white shadow-[0px_-2px_15px_rgba(0,0,0,0.06)] lg:hidden">
      <div className="flex w-full justify-around py-4 px-3">
        {navList.map(({ text, icon }, i) => (
          <button
            key={`botnav${text}`}
            className="flex h-12 w-14 flex-col items-center justify-between"
            onClick={() => buttonClickHandler(i)}
          >
            <div
              className={cls(
                Selected === i ? "stroke-[#00192F]" : "stroke-[#B1B1B1]"
              )}
            >
              {icon}
            </div>
            <div
              className={cls(
                "text-[11px] font-medium",
                Selected === i ? "text-[#00192F]" : "text-[#797979]"
              )}
            >
              {text}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomBar;
