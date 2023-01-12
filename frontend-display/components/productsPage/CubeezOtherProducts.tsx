import React, { useState } from "react";
import Image from "next/image";
import { ProductCardRolling } from "../ProductCard";
import { dummyProductInfo } from "../../pages";

const tempData = [
  {
    name: "여유로운 네델란드",
    photoUrl: "https://picsum.photos/411/284",
    hashTags: ["지중해", "유럽", "스페인", "패키지"],
    price: "3,000,000",
  },
  {
    name: "여유로운 네델란드",
    photoUrl: "https://picsum.photos/411/284",
    hashTags: ["지중해", "유럽", "스페인", "패키지"],
    price: "3,000,000",
  },
  {
    name: "여유로운 네델란드",
    photoUrl: "https://picsum.photos/411/284",
    hashTags: ["지중해", "유럽", "스페인", "패키지"],
    price: "3,000,000",
  },
  {
    name: "여유로운 네델란드",
    photoUrl: "https://picsum.photos/411/284",
    hashTags: ["지중해", "유럽", "스페인", "패키지"],
    price: "3,000,000",
  },
  {
    name: "여유로운 네델란드",
    photoUrl: "https://picsum.photos/411/284",
    hashTags: ["지중해", "유럽", "스페인", "패키지"],
    price: "3,000,000",
  },
  {
    name: "여유로운 네델란드",
    photoUrl: "https://picsum.photos/411/284",
    hashTags: ["지중해", "유럽", "스페인", "패키지"],
    price: "3,000,000",
  },
  {
    name: "여유로운 네델란드",
    photoUrl: "https://picsum.photos/411/284",
    hashTags: ["지중해", "유럽", "스페인", "패키지"],
    price: "3,000,000",
  },
  {
    name: "여유로운 네델란드",
    photoUrl: "https://picsum.photos/411/284",
    hashTags: ["지중해", "유럽", "스페인", "패키지"],
    price: "3,000,000",
  },
  {
    name: "여유로운 네델란드",
    photoUrl: "https://picsum.photos/411/284",
    hashTags: ["지중해", "유럽", "스페인", "패키지"],
    price: "3,000,000",
  },
  {
    name: "여유로운 네델란드",
    photoUrl: "https://picsum.photos/411/284",
    hashTags: ["지중해", "유럽", "스페인", "패키지"],
    price: "3,000,000",
  },
  {
    name: "여유로운 네델란드",
    photoUrl: "https://picsum.photos/411/284",
    hashTags: ["지중해", "유럽", "스페인", "패키지"],
    price: "3,000,000",
  },
  {
    name: "여유로운 네델란드",
    photoUrl: "https://picsum.photos/411/284",
    hashTags: ["지중해", "유럽", "스페인", "패키지"],
    price: "3,000,000",
  },
  {
    name: "여유로운 네델란드",
    photoUrl: "https://picsum.photos/411/284",
    hashTags: ["지중해", "유럽", "스페인", "패키지"],
    price: "3,000,000",
  },
  {
    name: "여유로운 네델란드",
    photoUrl: "https://picsum.photos/411/284",
    hashTags: ["지중해", "유럽", "스페인", "패키지"],
    price: "3,000,000",
  },
  {
    name: "여유로운 네델란드",
    photoUrl: "https://picsum.photos/411/284",
    hashTags: ["지중해", "유럽", "스페인", "패키지"],
    price: "3,000,000",
  },
];

const overflowNum = tempData.length - 2;

const Item = (props: any) => {
  const { data } = props;
  return (
    <div className="flex  w-[411px] max-w-[411px] flex-col  ">
      <Image alt="" src={data.photoUrl} width="411.49px" height="284.58px" />

      <div className=" box-border flex flex-col rounded-[0px_0px_6px_6px] border px-[17px] pt-[14px] pb-[20px]">
        <h3 className="m-0 font-['Pretendard'] text-[18px] font-semibold leading-[21.48px] text-[#1c1c1c]">
          {data.name}
        </h3>
        <div className="mt-[6px] flex gap-[4px]">
          {data.hashTags.map((hashTag: any, index: any) => (
            <h3
              className="m-0 font-['Pretendard'] text-[13.38px] font-normal leading-[15.97px] text-[#8d8d8d]"
              key={index}
            >{`# ${hashTag}`}</h3>
          ))}
        </div>
        <h2 className="mt-[16px] mb-0  font-['Pretendard'] text-[20px] font-semibold leading-[23.87px] text-[#1c1c1c]">{`￦${data.price}`}</h2>
      </div>
    </div>
  );
};

const CubeezOtherProducts = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <div className="flex flex-col px-[20px] pb-[46px] pt-[32px] lg:px-0 lg:pt-0 lg:pb-[211px]">
      <div className="flex">
        <h1 className="m-0 font-['Pretendard'] text-[25px] font-semibold leading-[30px] text-[#00192f]">
          큐비즈의 다른 상품
        </h1>
      </div>

      <div className="block lg:hidden">
        <ProductCardRolling
          productList={[
            ...dummyProductInfo.slice(3),
            ...dummyProductInfo.slice(0, 3),
          ]}
        />
      </div>

      <div className="hidden lg:block">
        <div className="mt-[33px] flex flex-wrap justify-between gap-[30px] ">
          {!showMore &&
            tempData.map((data, index) =>
              index < 3 ? <Item key={index} data={data} /> : null
            )}

          {showMore &&
            tempData.map((data, index) => <Item key={index} data={data} />)}
        </div>

        <div
          className="review-showmore mt-[24px] flex w-fit cursor-pointer items-center justify-center rounded-[7px] border-[1.5px] border-[#00192f] py-[17px] px-[35px]"
          onClick={toggleShowMore}
        >
          <span className="m-0 font-['Pretendard'] text-[20px] font-medium leading-[23.87px] text-[#00192f]">
            {!showMore ? `다른상품 ${overflowNum}개 모두 보기` : "접기"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CubeezOtherProducts;
