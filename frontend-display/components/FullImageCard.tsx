import Image, { ImageProps } from "next/image";
import { useRef } from "react";
import { cls } from "../utils/cls";
import { leftSvg, rightSvg } from "./ProductCard";
import useRolling from "./useRolling";

export interface FullImageCardRollingProps {
  cardInfoList: FullImageInfoI[];
  noBackground?: boolean;
  large?: boolean;
}

export const FullImageCardRolling = (props: FullImageCardRollingProps) => {
  const { cardInfoList, noBackground = false, large = false } = props;
  const length = cardInfoList.length;
  const repeatedList = [
    ...cardInfoList,
    ...cardInfoList,
    ...cardInfoList,
    ...cardInfoList,
    ...cardInfoList,
  ];
  const container = useRef<HTMLDivElement>(null);
  const {
    changeIndex,
    handleTouchStart,
    handleTouchMove,
    currentIndex,
    showIndex,
    setIndex,
  } = useRolling({
    containerRef: container,
    defaultLength: length,
    scrollCalc: (index, compWidth, isPC) => {
      const eachWidth = compWidth;
      const target = eachWidth * index;
      return target;
    },
  });
  return (
    <div className="flex w-full">
      <button
        className="mr-6 hidden flex-shrink-0 lg:block"
        onClick={() => changeIndex(-1)}
      >
        {leftSvg}
      </button>
      <div className="relative w-full">
        <div
          className="flex w-full items-center overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div className="flex w-full items-center" ref={container}>
            {repeatedList.map((info, i) => (
              <div
                className="w-full flex-shrink-0"
                key={`rollingFull${info.mainTitle}${i}`}
              >
                <FullImageCard
                  fullImageInfo={info}
                  noBackground={noBackground}
                  large={large}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-4 flex w-full justify-center gap-2">
          {Array(length)
            .fill(0)
            .map((_, i) => (
              <button
                className={cls(
                  "h-1 rounded-full bg-white transition-all duration-300 lg:h-2",
                  i === showIndex ? "w-3 lg:w-6" : "w-1 bg-opacity-60 lg:w-2"
                )}
                key={`rollingFullDot${i}`}
                onClick={() => setIndex(i)}
              />
            ))}
        </div>
      </div>
      <button
        className=" ml-6 hidden flex-shrink-0 lg:block"
        onClick={() => changeIndex(1)}
      >
        {rightSvg}
      </button>
    </div>
  );
};

export interface FullImageInfoI {
  imageUrl: ImageProps["src"];
  mainTitle: string;
  subTitle?: string;
}

export interface FullImageCardProps {
  fullImageInfo: FullImageInfoI;
  noBackground?: boolean;
  large?: boolean;
}

export const FullImageCard = (props: FullImageCardProps) => {
  const { fullImageInfo, noBackground = false, large = false } = props;
  const { imageUrl, mainTitle, subTitle = "" } = fullImageInfo;
  return (
    <div
      className={cls(
        "relative w-full",
        large ? "aspect-[1/0.7]" : "aspect-[1/0.35]"
      )}
    >
      <Image
        src={imageUrl}
        alt={`${mainTitle} 이미지`}
        layout="fill"
        objectFit="cover"
      />
      <div
        className={cls(
          "absolute flex h-full w-full flex-col justify-center gap-2 bg-[black] px-5 lg:gap-5 lg:px-24",
          noBackground ? "bg-opacity-0" : "bg-opacity-60"
        )}
      >
        <div className=" text-base font-bold text-white lg:text-3xl">
          {mainTitle}
        </div>
        <div className=" text-[10px] font-normal text-white lg:text-lg">
          {subTitle}
        </div>
      </div>
    </div>
  );
};
