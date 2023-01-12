import Image, { ImageProps } from "next/image";
import Link from "next/link";

export interface MainBannerProps {
  imageUrl: ImageProps["src"];
  tagList?: string[];
  link?: string;
}

export const MainBanner = (props: MainBannerProps) => {
  const { imageUrl, tagList = [], link = "" } = props;
  return (
    <Link href={link}>
      <div className="as relative -mb-7 aspect-[1920/530] h-80 w-full lg:mb-0 lg:h-auto">
        <Image
          className="h-full w-full"
          src={imageUrl}
          layout="fill"
          objectFit="cover"
          alt="메인 상단 배너"
        ></Image>
        <div className="absolute bottom-12 flex w-full justify-start lg:justify-center">
          <div className="flex w-full max-w-[1440px] items-center justify-start gap-[7px] pl-5 lg:gap-3">
            {tagList.map((name, i) => (
              <div
                className="rounded border border-[#FF8E4F] px-2 py-[2px] text-[10px] text-[#FF8E4F] lg:px-4 lg:py-1 lg:text-[15px]"
                key={`mainBanner${name}${i}`}
              >
                #{name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MainBanner;
