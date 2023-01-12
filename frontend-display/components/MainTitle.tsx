export interface MainTitleProps {
  mainTitle: string;
  subTitle?: string;
}

export const MainTitle = (props: MainTitleProps) => {
  const { mainTitle, subTitle = "" } = props;
  return (
    <div className="w-full px-5 flex flex-col gap-1 mt-12 lg:mt-24 mb-4 lg:mb-10 lg:px-0 lg:items-center">
      <div className=" text-xl font-bold lg:text-[31px] lg:mb-2">
        {mainTitle}
      </div>
      <div className="text-[#999999] text-xs lg:text-lg">{subTitle}</div>
    </div>
  );
};

export default MainTitle;
