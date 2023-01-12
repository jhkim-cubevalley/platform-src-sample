import React, { useEffect, useState } from "react";

const H_SmallCategory = (props: any) => {
  const { smallCategories, filteredData, setFilteredData, originalData } =
    props;
  const [currentSmallCategoryIndx, setCurrentSmallCategoryIndx] = useState(1);

  useEffect(() => {
    if (currentSmallCategoryIndx === 1) {
      setFilteredData([...originalData]);
    }
    if (currentSmallCategoryIndx === 2) {
      const newArr = originalData.filter(
        (item: any, index: any) => item.category === "여행상품"
      );
      setFilteredData([...newArr]);
    }
    if (currentSmallCategoryIndx === 3) {
      const newArr = originalData.filter(
        (item: any, index: any) => item.category === "호텔숙박권"
      );
      setFilteredData([...newArr]);
    }
    if (currentSmallCategoryIndx === 4) {
      const newArr = originalData.filter(
        (item: any, index: any) => item.category === "입장권"
      );
      setFilteredData([...newArr]);
    }
  }, [currentSmallCategoryIndx]);

  return (
    <div className="flex items-center">
      {smallCategories && (
        <div className="mt-[50px] flex items-center gap-[28px]">
          {smallCategories.map((category: any, index: any) => (
            <div
              key={index}
              onClick={() => setCurrentSmallCategoryIndx(index + 1)}
              className={`box-border flex cursor-pointer items-center justify-center rounded-[5px]  py-[12px] px-[27px] ${
                currentSmallCategoryIndx === index + 1 ? "bg-[#2d2d2d]" : null
              }`}
            >
              <span
                className={`m-0 font-['Pretendard'] text-[22px] font-bold leading-[26px] ${
                  currentSmallCategoryIndx === index + 1
                    ? "text-[#ffffff]"
                    : "text-[#7e7e7e]"
                }`}
              >
                {category}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default H_SmallCategory;
