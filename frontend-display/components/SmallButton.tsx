import React from "react";

export const MyButton = (props: any) => {
  const {
    color,
    width,
    height,
    radius,
    children,
    temp,
    mobileNext,
    mobileBook,
    mobileEdit,
    mobileCancel,
    igpadding,
  } = props;

  if (width === "full") {
    if (igpadding) {
      <div
        className={`flex-ic lg:flex-center h-[56px] lg:h-[105px] bg-[${color}] rounded-[${radius}px] w-full`}
      >
        {children}
      </div>;
    }

    return (
      <div
        className={` flex-ic lg:flex-center h-[56px] lg:h-[105px] bg-[${color}] rounded-[${radius}px] w-full`}
      >
        {children}
      </div>
    );
  }

  if (temp) {
    return (
      <div
        className={`flex-center h-[64px] cursor-pointer bg-[${color}] rounded-[${radius}] w-[182px]`}
      >
        {children}
      </div>
    );
  }

  if (mobileNext) {
    return (
      <div
        className={`flex-center h-[43px] w-full cursor-pointer rounded-[4.23px] bg-[#00192f] lg:hidden`}
      >
        <span className="m-0 font-['Pretendard'] text-[14.66px] font-bold leading-[17.5px] text-[#ffffff] ">
          다음 단계
        </span>
      </div>
    );
  }

  if (mobileBook) {
    return (
      <div
        className={`flex-center h-[43px] w-full cursor-pointer rounded-[4.23px] bg-[#ff5c00] lg:hidden`}
      >
        <span className="m-0 font-['Pretendard'] text-[14.66px] font-bold leading-[17.5px] text-[#ffffff] ">
          예약하기
        </span>
      </div>
    );
  }

  if (mobileEdit) {
    return (
      <div
        className={`flex-center h-[43px] w-full cursor-pointer rounded-[4.23px] bg-[#00192f] lg:hidden`}
      >
        <span className="m-0 font-['Pretendard'] text-[14.66px] font-bold leading-[17.5px] text-[#ffffff] ">
          예약 수정
        </span>
      </div>
    );
  }

  if (mobileCancel) {
    return (
      <div
        className={`flex-center h-[43px] w-full cursor-pointer rounded-[4.23px] bg-[#c7c7c7] lg:hidden`}
      >
        <span className="m-0 font-['Pretendard'] text-[14.66px] font-bold leading-[17.5px] text-[#000000] ">
          예약 취소
        </span>
      </div>
    );
  }

  return (
    <div
      className={`flex-center cursor-pointer h-[${height}] bg-[${color}] rounded-[${radius}] w-[${width}]`}
    >
      {children}
    </div>
  );
};

export const YesNoButton = (props: any) => {
  const { isYes, active } = props;
  return (
    <div
      className={`flex-center cursor-pointer rounded-[2.1px] py-[4.6px] lg:rounded-[4.2px] lg:py-[10px] ${
        isYes ? "w-[41.1px]  lg:w-[81px]" : "w-[46.3px]  lg:w-[91px]"
      } ${active ? "bg-[#00192f]" : "bg-[#e7e7e7]"} `}
    >
      <span
        className={`m-0 font-['Pretendard'] text-[10.4px] font-bold leading-[12px] lg:text-[20px] lg:leading-[24.3px]  ${
          active ? "text-[#ffffff]" : "text-[#585858]"
        }`}
      >
        {isYes ? "예" : "아니오"}
      </span>
    </div>
  );
};

export const SmallProductButton = (props: any) => {
  const { active, text, quantities } = props;

  return (
    <div
      className={`box-border flex min-w-[125px]  cursor-pointer items-center justify-around rounded-[5px] py-[10px] px-[29px] ${
        active ? "bg-[#ff5c00]" : "bg-[#d9d9d9]"
      }`}
    >
      <span
        className={`whitespace-nowrap font-['Pretendard'] text-[24px] font-bold leading-[29px] ${
          active ? "text-white" : "text-[#525252]"
        }`}
      >
        {text}
      </span>
      {quantities && (
        <span
          className={`font-['Pretendard'] text-[24px] font-bold leading-[29px] ${
            active ? "text-white" : "text-[#525252]"
          }`}
        >
          {quantities}
        </span>
      )}
    </div>
  );
};

const SmallButton = (props: any) => {
  const { active, textColor, text } = props;

  return (
    <div className="p-[7px 15px 7.8px] flex-center box-border h-[33.8px] w-[86px] rounded-[4px] bg-[#f0f0f0] font-['Pretendard']">
      <span
        className={`${
          active ? "text-[#ff5c00]" : "text-[#a3a3a3]"
        } text-[16px] font-medium leading-[19px]`}
      >
        {text}
        {">"}
      </span>
    </div>
  );
};

SmallButton.defaultProps = {
  active: false,
  text: "버튼버튼",
  textColor: "#a3a3a3",
};

export default SmallButton;
