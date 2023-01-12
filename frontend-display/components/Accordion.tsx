import React, { useState } from "react";
import TriDown from "../public/images/tri_down.svg";
import TriUp from "../public/images/tri_up.svg";
import { cls } from "../utils/cls";

export const SingleAccordion = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const { children, headerTitle, headerSize, column } = props;

  const onClickToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="accordion flex w-full flex-col">
      <div
        onClick={onClickToggle}
        className={`accordion-header flex items-center justify-between  ${
          headerSize === "lg"
            ? "p-[17.2px] lg:p-[35px]"
            : "p-[9px_10.5px] lg:p-[18px_21px]"
        }`}
      >
        <h1
          className={`m-0 font-['Pretendard']  ${
            headerSize === "lg"
              ? "text-[#00192s] text-[10.87px]  font-medium leading-[14.3px] lg:text-[24px] lg:leading-[28.6px] "
              : "text-[9px] font-semibold  leading-[9px] text-[#212121] lg:text-[18px] lg:leading-[19px] "
          }`}
        >
          {headerTitle}
        </h1>
        {!isOpen ? <TriDown /> : <TriUp />}
      </div>

      <div
        className={cls(isOpen ? (column ? "flex flex-col" : "flex") : "hidden")}
      >
        {children}
      </div>
    </div>
  );
};

// 아코디언 범용성
// 아코디언 범용성
// 아코디언 범용성
// 아코디언 범용성

const Accordion = (props: any) => {
  const { data } = props;
  const [nowSelected, setNowSelected] = useState(0);

  const onClickToggle = (current: number) => {
    if (current === nowSelected) {
      setNowSelected(0);
    } else {
      setNowSelected(current);
    }
  };

  return (
    <div className="accordion-box flex w-full flex-col gap-[26px]  lg:gap-[31px]">
      {data.map((item: any, index: number) => (
        <div
          key={index}
          className=" accordion-item flex w-full flex-col gap-[15px] lg:gap-[19.35px]"
          onClick={() => onClickToggle(index + 1)}
        >
          <div className="accordion-header flex w-full items-center justify-between  ">
            <h1 className="font-['Pretendard'] text-[14px] font-medium leading-[16.7px] text-[#212121] lg:text-[18px] lg:leading-[21px]">
              {index + 1}. {item.title}
            </h1>
            {nowSelected === index + 1 ? <TriUp /> : <TriDown />}
          </div>
          {nowSelected === index + 1 ? (
            <div className="accordion-item-content">
              <p className="font-['Pretendard'] text-[13px]  font-normal leading-[23.27px] text-[#616161] lg:text-[16px] lg:leading-[28px]">
                {item.description}
              </p>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
