import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { Url, UrlObject } from "url";
import { cls } from "../utils/cls";

export interface FullImageBannerInfoI {
  imageUrl: ImageProps["src"];
  mainTitle: string;
  subTitle?: string;
  href?: string | UrlObject;
}

export interface FullSingleBannerProps {
  info: FullImageBannerInfoI;
}

export const FullSingleBanner = (props: FullSingleBannerProps) => {
  const { info } = props;
  const { imageUrl, mainTitle, subTitle = "", href } = info;

  return (
    <Link href={href || ""}>
      <div
        className={cls(
          "relative aspect-[4.33] w-full overflow-hidden lg:aspect-[6.6] lg:rounded-[10px]",
          href ? "hover:cursor-pointer" : ""
        )}
      >
        <Image src={imageUrl} alt={mainTitle} layout="fill" objectFit="cover" />
        <div className="absolute flex h-full w-full flex-col justify-center gap-1 bg-gradient-to-r from-[#000000] to-[#00000080] px-12 lg:gap-4 lg:px-10">
          <div className="text-base font-bold text-white lg:text-[25px] lg:font-semibold">
            {mainTitle}
          </div>
          <div className="text-[10px] font-normal text-white lg:text-base">
            {subTitle}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FullSingleBanner;
