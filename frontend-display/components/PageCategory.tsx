import React, { useState } from "react";
import DescTemp from "../public/images/descTemp.png";
import Image from "next/image";
import IncludedAndNot from "./productsPage/IncludedAndNot";
import Terms, { TermPopup } from "./productsPage/Terms";
import Notice from "./productsPage/Notice";
import Review from "./productsPage/Review";
import Schedule from "./productsPage/Schedule";
import { eachProductI } from "../utils/api/product";

const categorys = [
  "상품소개",
  "일정표",
  "포함/불포함사항",
  "유의사항",
  "약관",
  // "후기",
];

// const tempComponents = [
//   {
//     id: 1,
//     component: (
//       <div>
//         <Image src={DescTemp.src} alt="" width={870} height={1637} />
//       </div>
//     ),
//   },
//   {
//     id: 2,
//     component: <Schedule />,
//   },
//   {
//     id: 3,
//     component: <IncludedAndNot />,
//   },
//   {
//     id: 4,
//     component: <Notice />,
//   },
//   {
//     id: 5,
//     component: <Terms />,
//   },
//   {
//     id: 6,
//     component: <Review />,
//   },
// ];

const PageCategory = ({ data }: { data: eachProductI }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // console.log(data);
  const onClickCategory = (index: any) => {
    setCurrentPage(index + 1);
  };
  if (!data) return <></>;

  return (
    <div className="pageCategory flex w-full flex-col pb-10 lg:mt-[75px] lg:pb-[160px]">
      <div className="category grid  w-full grid-cols-3 grid-rows-2 border-t border-[#dbdbdb] bg-[rgba(0,37,70,0.03)] lg:flex lg:h-[73px] lg:items-center  lg:justify-between ">
        {categorys.map((category, index) => (
          <div
            key={index}
            className={`flex  h-full w-full cursor-pointer items-center justify-center py-[18px] px-[21px] ${
              index === currentPage - 1 ? "bg-white" : null
            }`}
            onClick={() => onClickCategory(index)}
          >
            <span
              className={`whitespace-nowrap font-['Pretendard'] text-[15px] leading-[17.9px] lg:text-[23px] lg:leading-[27.5px] ${
                index === currentPage - 1
                  ? "font-semibold text-[#00192f]"
                  : "font-medium text-[#bebebe]"
              } `}
            >
              {category}
            </span>
          </div>
        ))}
      </div>
      <div className="flex h-full w-full">
        {currentPage === 1 && (
          <div
            className="w-full"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
        )}
        {currentPage === 2 && <Schedule data={data} />}
        {currentPage === 3 && (
          <IncludedAndNot
            included={data.note.filter((t) => t.type === "in")}
            notIncluded={data.note.filter((t) => t.type === "notin")}
            etc={data.moreNote}
          />
        )}
        {currentPage === 4 && (
          <Notice
            data={[
              { title: "환불규정", content: data.refund },
              { title: "유의사항", content: data.caution },
            ]}
          />
        )}
        {currentPage === 5 && <Terms termsList={data.tos} />}
      </div>
    </div>
  );
};

export default PageCategory;
