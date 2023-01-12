import React, { useEffect, useState } from "react";
import SearchResultCard from "./SearchResultCard";
import ChevronDown from "../../public/images/chevron-down-gray.svg";

const tempCategory = ["인기순", "최신순", "낮은가격순", "높은가격순"];

const SearchResults = (props: any) => {
  const { data, showLimited, filterCategories } = props;
  const [displayData, setDisplayData] = useState<Array<any>>([]);
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  useEffect(() => {
    if (showLimited) {
      if (data) {
        if (!showMore) {
          try {
            const newArr = data.slice(0, 6);
            setDisplayData([...newArr]);
          } catch (error) {
            //
          } finally {
            setIsLoading(false);
          }
        } else if (showMore) {
          try {
            setDisplayData([...data]);
          } catch (error) {
            //
          } finally {
            setIsLoading(false);
          }
        }
      }
    }
    if (!showLimited) {
      if (data) {
        try {
          setDisplayData([...data]);
        } catch (error) {
          //
        } finally {
          setIsLoading(false);
        }
      }
    }
  }, [showMore, showLimited]);

  if (isLoading) {
    return <div>로딩중</div>;
  }

  return (
    <div className="flex w-full flex-col pb-[21.78px] lg:mt-[50px] lg:gap-[56px] lg:pb-0">
      {/* 카테고리  */}
      <div className="flex justify-between py-[20px] px-[30px] lg:py-0 lg:px-0">
        <div className="flex items-center">
          <span className="m-0 font-['Pretendard'] text-[13px] font-bold leading-[15.5px] text-[#7b7b7b] lg:text-[25px] lg:leading-[30px]">
            총 {data.length}건
          </span>
        </div>
        <div className="hidden items-center gap-[44px] lg:flex">
          {filterCategories.map((category: any, index: any) => (
            <span
              className="m-0 font-['Pretendard']  font-bold leading-[28.73px] text-[#a0a0a0] lg:text-[24px]"
              key={index}
            >
              {category}
            </span>
          ))}
        </div>

        <select className="flex flex-col font-['Pretendard'] text-[13px] font-bold leading-[15.51px] text-[#717171] lg:hidden">
          {filterCategories.map((item: any, index: any) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {/* 카테고리  */}

      {/* 아이템 카드 */}
      <div className="flex flex-col gap-[22px] px-[30px] lg:grid lg:auto-rows-fr lg:grid-cols-3 lg:gap-[46px] lg:px-0">
        {/* {[...data, ...data, ...data, ...data, ...data, ...data, ...data].map( */}
        {data.map((data: any, index: any) => (
          <SearchResultCard key={index} data={data} />
        ))}
      </div>
      {/* 아이템 카드 */}

      {showLimited && data.length > 7 && (
        <div className="mt-[71px] flex items-center justify-center ">
          <div
            className="flex  cursor-pointer items-center justify-center gap-[17px]"
            onClick={() => toggleShowMore()}
          >
            <span className="cur m-0 font-['Pretendard'] text-[24px] font-bold leading-[29px] text-[#717171]">
              더보기
            </span>
            <ChevronDown width="28px" height="14px" />
          </div>
        </div>
      )}
    </div>
  );
};

SearchResults.defaultProps = {
  filterCategories: ["인기순", "최신순", "낮은가격순", "높은가격순"],
};

export default SearchResults;
