import React, { useEffect, useState } from "react";

const H_Category = (props: any) => {
  const { categories, setCurrentCountry, hasFull } = props;
  // 각 페이지에서 가져온 인덱스, 카테고리,
  //setCurrentCountery 는 Ux 페이지에서 사용한 것이라 무시해도 됨 => api 연동시 지워질 부분
  // hasFull => true 이면 "전체" 카테고리가 추가됨 hasFull => false 이면 categories 배열에 들어간 카테고리만 나타냄
  const [currentCategoryIdx, setCurrentCategoryIdx] = useState(1);
  const [loadedCategories, setLoadedCategories] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (hasFull && categories) {
      try {
        if (setCurrentCountry) {
          setCurrentCountry(-1);
        }
        setLoadedCategories(["전체", ...categories]);
      } catch (e) {
        //
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        setLoadedCategories([...categories]);
      } catch (e) {
        //
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  if (isLoading) {
    <div>로딩중</div>;
  }

  return (
    <div className="flex w-full max-w-[1320px] border-collapse flex-col overflow-hidden px-[30px] py-[15px] lg:py-0 lg:px-0">
      {/* 큰 카테고리 S*/}
      <div className="flex items-center justify-between  lg:justify-start">
        {loadedCategories.map((category: any, index: any) => (
          <div
            key={index}
            className={`box-border flex border-collapse cursor-pointer items-center justify-center lg:border-[#000000] lg:py-[20px] lg:px-[40px] ${
              currentCategoryIdx === index + 1
                ? "lg:border-[2px]  lg:border-b-[2px] lg:border-b-[#fafafa]"
                : "lg:border-b-[2px]"
            } `}
            onClick={() => {
              if (setCurrentCountry) {
                const newIndex = index - 1;
                setCurrentCountry(newIndex);
              }
              setCurrentCategoryIdx(index + 1);
            }}
          >
            <h1
              className={`m-0 whitespace-nowrap font-['Pretendard'] text-[24px] font-semibold leading-[28.6px] ${
                index + 1 === currentCategoryIdx
                  ? "text-[#ff5c00]"
                  : "text-[#7e7e7e]"
              }`}
            >
              {category}
            </h1>
          </div>
        ))}
        <div className="hidden w-full items-center py-[20px] px-[40px] lg:flex lg:border-b-[2px] lg:border-[#000000]">
          <h1 className="m-0 whitespace-nowrap font-['Pretendard'] text-[24px] font-semibold leading-[28.6px] text-[#000000] opacity-0">
            길이맞추기 텍스트
          </h1>
        </div>
      </div>
      {/* 큰 카테고리 E*/}
    </div>
  );
};

export default H_Category;
