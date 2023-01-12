import Image, { ImageProps } from "next/image";
import { useRef } from "react";
import { cls } from "../utils/cls";
import { useRolling } from "./useRolling";
import { useRouter } from "next/router";

export const leftSvg = (
  <svg
    width="16"
    height="29"
    viewBox="0 0 16 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.9372 26.9712L2.03244 15.0665C1.6235 14.6575 1.6235 13.9945 2.03243 13.5856L13.4414 2.17661"
      stroke="#CECECE"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="bevel"
    />
  </svg>
);

export const rightSvg = (
  <svg
    width="16"
    height="29"
    viewBox="0 0 16 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.06277 2.17664L13.9676 14.0814C14.3765 14.4903 14.3765 15.1533 13.9676 15.5623L2.5586 26.9712"
      stroke="#CECECE"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="bevel"
    />
  </svg>
);

export interface ProductCardRollingProps {
  productList: productInfoI[];
  centerLarge?: boolean;
}

export const ProductCardRolling = (props: ProductCardRollingProps) => {
  const { productList, centerLarge = false } = props;
  const length = productList.length;
  const repeatedList = [
    ...productList,
    ...productList,
    ...productList,
    ...productList,
    ...productList,
  ];
  const container = useRef<HTMLDivElement>(null);
  const { changeIndex, handleTouchStart, handleTouchMove, currentIndex } =
    useRolling({
      containerRef: container,
      defaultLength: length,
      scrollCalc: (index, compWidth, isPC) => {
        const eachWidth = isPC ? compWidth / 3 : compWidth * 0.75;
        const restLeft = (compWidth - eachWidth) / 2;
        const target = eachWidth * index - restLeft;
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
            <ProductCard
              isLarge={
                (i === currentIndex ||
                  i - length === currentIndex ||
                  i + length === currentIndex) &&
                centerLarge
              }
              productInfo={info}
              key={`rolling${info.productName}${info.cubeezName}${i}`}
            />
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

export interface productInfoI {
  cubeezIcon: ImageProps["src"];
  cubeezName: string;
  productName: string;
  productImage: ImageProps["src"];
  productPrice: number;
  productTag?: string[];
  recommended?: boolean;
  id?: number | string;
}

export interface ProductCardProps {
  productInfo: productInfoI;
  isLarge?: boolean;
}

export const ProductCard = (props: ProductCardProps) => {
  const router = useRouter();
  const { productInfo, isLarge = false } = props;
  const {
    cubeezIcon,
    cubeezName,
    productImage,
    productName,
    productPrice,
    productTag = [],
    recommended = false,
    id,
  } = productInfo;
  return (
    <div
      className={cls(
        " w-3/4 flex-shrink-0 cursor-pointer  rounded transition-all duration-[200ms] lg:w-1/3",
        isLarge ? "scale-[1]" : "scale-[0.875]"
      )}
      onClick={() => id && router.push(`/product/${id}`)}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-t">
        <Image
          src={productImage}
          alt={`${productName} 이미지`}
          layout="fill"
          objectFit="cover"
        ></Image>
        <div className="absolute h-2/5 w-full bg-gradient-to-b from-black to-transparent">
          <div className="flex w-full items-center justify-between px-2.5 pt-2.5 lg:px-5 lg:pt-5">
            {cubeezName !== "" ? (
              <div className="flex items-center gap-2 lg:gap-3">
                <div className=" relative h-7 w-7 lg:h-10 lg:w-10">
                  <Image
                    src={cubeezIcon}
                    alt={`${cubeezName} 아이콘`}
                    layout="fill"
                    objectFit="cover"
                  ></Image>
                </div>
                <div className="text-xs font-semibold text-white lg:text-lg">
                  {cubeezName}
                </div>
              </div>
            ) : (
              <div />
            )}

            {recommended && (
              <div className="rounded-sm bg-white px-2 py-[2px] text-[10px] lg:px-3 lg:text-sm">
                MD👍
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" rounded-l rounded-br border-x border-b p-2.5 lg:p-5">
        <div className="text-[15px] font-semibold lg:text-[22px]">
          {productName}
        </div>
        <div className="flex gap-1">
          {productTag.map((tag, i) => (
            <div
              className="text-[10px] font-normal text-[#B6B6B6] lg:text-base"
              key={`${productName}tag${tag}${i}`}
            >
              #{tag}
            </div>
          ))}
        </div>
        <div className="text-lg font-semibold lg:mt-2 lg:text-[25px]">
          ￦{productPrice.toLocaleString()} ~
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
