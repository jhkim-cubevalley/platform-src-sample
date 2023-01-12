import Image, { ImageProps } from "next/image";
import { useRef } from "react";
import { leftSvg, rightSvg } from "./ProductCard";
import useRolling from "./useRolling";

export interface CubeezCardRollingProps {
  cubeezList: cubeezInfoI[];
}

export const CubeezCardRolling = (props: CubeezCardRollingProps) => {
  const { cubeezList } = props;
  const length = cubeezList.length;
  const repeatedList = [
    ...cubeezList,
    ...cubeezList,
    ...cubeezList,
    ...cubeezList,
    ...cubeezList,
  ];
  const container = useRef<HTMLDivElement>(null);
  const { changeIndex, handleTouchStart, handleTouchMove, currentIndex } =
    useRolling({
      containerRef: container,
      defaultLength: length,
      scrollCalc: (index, compWidth, isPC) => {
        const eachWidth = isPC ? compWidth / 5 : 176;
        const target = eachWidth * index;
        return target;
      },
    });

  return (
    <div className="flex w-full">
      <button
        className="mr-3 hidden flex-shrink-0 lg:block"
        onClick={() => changeIndex(-1)}
      >
        {leftSvg}
      </button>
      <div
        className="flex w-full items-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="flex w-full items-center" ref={container}>
          {repeatedList.map((info, i) => (
            <div
              className="w-44 flex-shrink-0 px-4 lg:w-1/5"
              key={`rollingCubeez${info.cubeezName}${i}`}
            >
              <CubeezCard cubeezInfo={info} />
            </div>
          ))}
        </div>
      </div>
      <button
        className=" ml-3 hidden flex-shrink-0 lg:block"
        onClick={() => changeIndex(1)}
      >
        {rightSvg}
      </button>
    </div>
  );
};

export interface cubeezInfoI {
  cubeezIcon: ImageProps["src"];
  cubeezName: string;
  cubeezTag?: string;
  cubeezDesc: string;
}

export interface CubeezCardProps {
  cubeezInfo: cubeezInfoI;
}

export const CubeezCard = (props: CubeezCardProps) => {
  const { cubeezInfo } = props;
  const { cubeezName, cubeezIcon, cubeezDesc, cubeezTag = null } = cubeezInfo;
  return (
    <div className="flex w-full flex-col items-center justify-center rounded border py-8">
      <div className=" relative h-16 w-16 overflow-hidden rounded-full lg:h-24 lg:w-24">
        <Image
          src={cubeezIcon}
          alt={`${cubeezName} 아이콘`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className=" mt-4 text-sm font-semibold lg:text-2xl">
        {cubeezName}
      </div>
      {cubeezTag && (
        <div className="text-[11px] text-[#727272] lg:text-lg">
          #{cubeezTag}
        </div>
      )}
      <div className="hidden text-base font-normal text-[#8D8D8D] lg:mt-7 lg:block lg:px-7">
        {cubeezDesc}
      </div>
    </div>
  );
};
