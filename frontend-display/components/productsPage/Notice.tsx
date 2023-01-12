import React from "react";

const tempData = [
  {
    title: "",
    contents: ["내용1", "내용2", "내용3", "내용4", "내용5"],
  },
  {
    title: "유의사항",
    contents: ["내용1", "내용2", "내용3", "내용4", "내용5"],
  },
  {
    title: "유의사항2",
    contents: ["내용1", "내용2", "내용3", "내용4", "내용5"],
  },
  {
    title: "유의사항3",
    contents: ["내용1", "내용2", "내용3", "내용4", "내용5"],
  },
];

const Notice = ({ data }: { data: { title: string; content: string }[] }) => {
  return (
    <div className="notice flex  w-full flex-col gap-4 px-[20px] pt-[10px] lg:px-0 lg:pt-[20px]">
      {data.map(({ title, content }, index) => (
        <div
          key={index}
          className="notice-box flex flex-col gap-[15px] lg:gap-2"
        >
          {title.length > 0 && (
            <h1 className="font-['Pretendard'] text-[16px] font-semibold leading-[23px] text-[#000000] lg:text-[22px] lg:leading-[30px]">
              {title}
            </h1>
          )}
          <div
            className="flex flex-col px-[20px] lg:px-0"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Notice;
