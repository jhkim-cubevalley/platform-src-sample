import React from "react";
import CircleGray from "../../public/images/circle-gray.svg";
import CircleOrangeStrog from "../../public/images/circle-orange-strong.svg";
import CircleOrangeShallow from "../../public/images/circle-orange-shallow.svg";

const Line = (props: any) => {
  const { isLast } = props;

  if (isLast) {
    return null;
  }

  return <div className="h-[2px] w-[68px] bg-[#7e7e7e] lg:w-[140px]" />;
};

const Text = (props: any) => {
  const { text, active, stage } = props;
  return (
    <span
      className={`m-0 whitespace-nowrap font-['Pretendard'] text-[9.61px] font-bold leading-[11.47px] lg:text-[19.3px] lg:leading-[23px]  ${
        active ? "text-[#ff5c00]" : "text-[#7e7e7e]"
      }`}
    >
      {text}
    </span>
  );
};

const Stage = (props: any) => {
  const { text, active, isLast } = props;
  return (
    <div className="flex-center flex-col  lg:gap-[15.8px]">
      <div className="flex">
        <div className="flex-center relative h-[21px] w-[21px] flex-col lg:h-[42px] lg:w-[42px]  ">
          <div className="flex-center z-10">
            {active ? (
              <>
                <div className="lg:flex-center hidden">
                  <div className="absolute">
                    <CircleOrangeShallow width="42px" height="42px" />
                  </div>
                  <div className="absolute">
                    <CircleOrangeStrog width="28.92px" height="28.92px" />
                  </div>
                </div>

                <div className="flex-center lg:hidden">
                  <div className="absolute">
                    <CircleOrangeShallow width="21px" height="21px" />
                  </div>
                  <div className="absolute">
                    <CircleOrangeStrog width="14.42px" height="14.42px" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="lg:flex-center hidden">
                  <div className="absolute">
                    <CircleGray width="28.92px" height="28.92px" />
                  </div>
                </div>
                <div className="flex-center lg:flex-center">
                  <div className="absolute">
                    <CircleGray width="14.42px" height="14.42px" />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="absolute left-[14.42px] z-0 hidden w-full lg:left-[29px] lg:block ">
            <Line isLast={isLast} />
          </div>
        </div>
      </div>

      <div>
        <Text active={active} text={text} />
      </div>
    </div>
  );
};

const ProgressBar = (props: any) => {
  return (
    <>
      <div
        className={`flex w-full justify-between lg:h-[81px] lg:justify-center lg:gap-[80px]`}
      >
        <Stage active text="예약 접수" />
        <Stage text="담당자 확인" />
        <Stage text="선금 입금" />
        <Stage text="완납" />
        <Stage isLast text="예약 확정" />
      </div>

      {/* <div className="flex-ic w-full lg:hidden">
        <div className="flex-center  w-full flex-col gap-[8px]">
          <div className="flex-center relative h-[21px] w-[21px]">
            <div className="flex-center absolute">
              <CircleOrangeShallow width="21px" height="21px" />
            </div>
            <div className="flex-center absolute">
              <CircleOrangeStrog width="14.42px" height="14.42px" />
            </div>
            <div className="absolute left-[21px]">
              <Line />
            </div>
          </div>

          <div>
            <span className="m-0 font-['Pretendard'] text-[9.6px] font-bold leading-[11.47px] text-[#ff5c00]">
              에약 접수
            </span>
          </div>
        </div>
        <div className="flex-center  w-full flex-col gap-[8px]">
          <div className="flex-center relative h-[21px] w-[21px]">
            <div className="flex-center absolute">
              <CircleOrangeShallow width="21px" height="21px" />
            </div>
            <div className="flex-center absolute">
              <CircleOrangeStrog width="14.42px" height="14.42px" />
            </div>
            <div className="absolute left-[21px]">
              <Line />
            </div>
          </div>

          <div>
            <span className="m-0 font-['Pretendard'] text-[9.6px] font-bold leading-[11.47px] text-[#ff5c00]">
              에약 접수
            </span>
          </div>
        </div>
        <div className="flex-center  w-full flex-col gap-[8px]">
          <div className="flex-center relative h-[21px] w-[21px]">
            <div className="flex-center absolute">
              <CircleOrangeShallow width="21px" height="21px" />
            </div>
            <div className="flex-center absolute">
              <CircleOrangeStrog width="14.42px" height="14.42px" />
            </div>
            <div className="absolute left-[21px]">
              <Line />
            </div>
          </div>

          <div>
            <span className="m-0 font-['Pretendard'] text-[9.6px] font-bold leading-[11.47px] text-[#ff5c00]">
              에약 접수
            </span>
          </div>
        </div>
        <div className="flex-center  w-full flex-col gap-[8px]">
          <div className="flex-center relative h-[21px] w-[21px]">
            <div className="flex-center absolute">
              <CircleOrangeShallow width="21px" height="21px" />
            </div>
            <div className="flex-center absolute">
              <CircleOrangeStrog width="14.42px" height="14.42px" />
            </div>
            <div className="absolute left-[21px]">
              <Line />
            </div>
          </div>

          <div>
            <span className="m-0 font-['Pretendard'] text-[9.6px] font-bold leading-[11.47px] text-[#ff5c00]">
              에약 접수
            </span>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ProgressBar;
