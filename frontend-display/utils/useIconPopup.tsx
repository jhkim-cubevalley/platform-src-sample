import { ReactNode, useState } from "react";
import MainButton from "../components/MainButton";
import { cls } from "./cls";

const closeSvg = (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 1.00024L22 22.0002" stroke="#8C8C8C" strokeWidth="2" />
    <path d="M1 22.0002L22 1.00029" stroke="#8C8C8C" strokeWidth="2" />
  </svg>
);

const orangeSvg = (
  <svg
    width="54"
    height="60"
    viewBox="0 0 54 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="27" cy="32.6127" r="27" fill="#FF5C00" />
    <path
      d="M25.0029 37.5321H28.9907L29.863 22.2042L30.0707 16.4302H23.9229L24.1306 22.2042L25.0029 37.5321ZM26.9968 48.5815C29.1569 48.5815 30.8184 46.8369 30.8184 44.5938C30.8184 42.3091 29.1569 40.606 26.9968 40.606C24.8368 40.606 23.2168 42.3091 23.2168 44.5938C23.2168 46.8369 24.8368 48.5815 26.9968 48.5815Z"
      fill="white"
    />
  </svg>
);

const blackSvg = (
  <svg
    width="54"
    height="54"
    viewBox="0 0 54 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="27" cy="27" r="27" fill="#00192F" />
    <path
      d="M14.3096 27.0451L23.377 36.521L39.353 19.8253"
      stroke="white"
      strokeWidth="4.37838"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const svgList = {
  orange: orangeSvg,
  black: blackSvg,
};

interface buttonInfo {
  type: "orange" | "black" | "gray";
  callback: () => void;
  text: string;
}

interface closeButtonInfo {
  type: "close";
  text?: string;
}

type allButtonInfo = buttonInfo | closeButtonInfo;

export interface IconPopupInfoI {
  type: "orange" | "black";
  title: string;
  desc?: string;
  buttonList?: allButtonInfo[];
  children?: ReactNode;
}

export type openIconPopupType = (info: IconPopupInfoI) => void;

const IconPopupInner = (props: {
  info: IconPopupInfoI;
  closePopup: () => void;
}) => {
  const { info, closePopup } = props;
  const {
    type,
    title,
    desc = null,
    buttonList = null,
    children = false,
  } = info;
  return (
    <div className="w-full flex flex-col items-center justify-between gap-7">
      {svgList[type]}
      <div className="w-full flex flex-col items-center gap-2">
        <div className="text-[#383838] text-[24px] font-bold whitespace-pre-wrap text-center">
          {title}
        </div>
        {desc && (
          <div className="text-[#FF5C00] text-xl whitespace-pre-wrap text-center">
            {desc}
          </div>
        )}
      </div>
      {children}
      <div className="w-full h-12 flex gap-4 mt-10">
        {buttonList ? (
          buttonList.map((btn, idx) => {
            const { type: btnType } = btn;
            if (btnType === "close") {
              const { text = null } = btn;
              return (
                <MainButton
                  styleType="gray"
                  key={idx}
                  onClick={() => closePopup()}
                >
                  {text ?? "아니오"}
                </MainButton>
              );
            }
            const { text, callback } = btn;
            return (
              <MainButton
                key={idx}
                styleType={btnType}
                onClick={() => callback()}
              >
                {text}
              </MainButton>
            );
          })
        ) : (
          <MainButton styleType="orange" onClick={() => closePopup()}>
            확인
          </MainButton>
        )}
      </div>
    </div>
  );
};

export const useIconPopup = () => {
  const [Info, setInfo] = useState<IconPopupInfoI | null>(null);
  const openPopup = (info: IconPopupInfoI) => setInfo(info);
  const closePopup = (callback?: () => void) => {
    if (callback) callback();
    setInfo(null);
  };
  const isOpen = Info ? true : false;
  const component = (
    <div
      className={cls(
        "fixed w-screen h-screen bg-black bg-opacity-80 left-0 top-0 z-30 flex justify-center items-center",
        isOpen ? "" : "hidden"
      )}
      onClick={() => closePopup()}
    >
      <div
        className={
          " w-[466px] px-12 pb-12 pt-20 bg-[#F2F2F2] flex flex-col rounded-xl relative"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-7 left-7" onClick={() => closePopup()}>
          {closeSvg}
        </button>
        {Info && <IconPopupInner info={Info} closePopup={closePopup} />}
      </div>
    </div>
  );
  return {
    component,
    openPopup,
    closePopup,
    isOpen,
  };
};

export default useIconPopup;
