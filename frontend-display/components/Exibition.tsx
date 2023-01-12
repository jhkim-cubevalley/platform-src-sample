import React, { useState } from "react";
import Image from "next/image";
import Bg1 from "../public/images/tmp/u7-1.png";
import Bg2 from "../public/images/tmp/u7-2.png";
import Bg3 from "../public/images/tmp/u7-3.png";
import H_Separator from "./H_Separator";
import { useRouter } from "next/router";

const ExibitionItem = (props: any) => {
  const router = useRouter();
  const { isLast, tempIndex } = props;

  return (
    <div
      className="mt-[74px] flex cursor-pointer flex-col"
      onClick={() => router.push(`/promotions/${tempIndex}`)}
    >
      <div className="flex flex-col gap-[12px]">
        <h1 className="m-0 font-['Pretendard'] text-[32px] font-bold leading-[38px] text-[#545454]">
          이름이름
        </h1>
        <p className="m-0 font-['Pretendard'] text-[24px] font-semibold leading-[28.6px] text-[#717171]">
          기획전설명기획전설명기획전설명기획전설명
        </p>
      </div>

      <div className="mt-[60px] ">
        {tempIndex === 1 && (
          <Image
            alt=""
            src={Bg1}
            layout="fixed"
            width="1313px"
            height="373px"
          />
        )}
        {tempIndex === 2 && (
          <Image
            alt=""
            src={Bg2}
            layout="fixed"
            width="1313px"
            height="373px"
          />
        )}
        {tempIndex === 3 && (
          <Image
            alt=""
            src={Bg3}
            layout="fixed"
            width="1313px"
            height="373px"
          />
        )}
      </div>

      {!isLast && (
        <div className="mt-[74px]">
          <H_Separator />
        </div>
      )}
    </div>
  );
};

ExibitionItem.defaultProps = {
  isLast: false,
};

const Exibition = (props: any) => {
  const [currentFilter, setCurrentFilter] = useState(1);

  return (
    <div className="flex w-full flex-col">
      <div className="mt-[42px] flex items-center justify-between">
        <span className="m-0 font-['Pretendard'] text-[25px] font-bold leading-[30px] text-[#7b7b7b] ">
          총 20건
        </span>
        <div className="flex items-center gap-[44px]">
          <span
            className={`m-0 cursor-pointer font-['Pretendard'] text-[24px] font-bold leading-[28.7px] ${
              currentFilter === 1 ? "text-[#717171]" : "text-[#a0a0a0]"
            } `}
            onClick={() => setCurrentFilter(1)}
          >
            인기순
          </span>
          <span
            className={`m-0 cursor-pointer font-['Pretendard'] text-[24px] font-bold leading-[28.7px] ${
              currentFilter === 2 ? "text-[#717171]" : "text-[#a0a0a0]"
            } `}
            onClick={() => setCurrentFilter(2)}
          >
            최신순
          </span>
        </div>
      </div>

      <div className="flex w-full flex-col">
        <ExibitionItem tempIndex={1} />
        <ExibitionItem tempIndex={2} />
        <ExibitionItem tempIndex={3} isLast />
      </div>
    </div>
  );
};

export default Exibition;
