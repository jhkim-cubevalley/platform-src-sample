import React, { useContext } from "react";
import SmallButton from "../SmallButton";
import Img from "../../public/images/tmp/gridTemp.png";
import { UserContext } from "../../contexts/UserStore";
import Image from "next/image";

const tempGridImg = [
  //15 Imgs
  Img,
  Img,
  Img,
  Img,
  Img,
  Img,
  Img,
  Img,
  Img,
  Img,
  Img,
  Img,
  Img,
  Img,
  Img,
];

const ImgOverflowLength = tempGridImg.length - 5;

const tempButtonText = [
  { label: "출발가능", id: 1 },
  { label: "일정예정", id: 2 },
  { label: "가격예정", id: 3 },
  { label: "항공예정", id: 4 },
  { label: "출발가능", id: 5 },
  { label: "숙박미정", id: 6 },
  { label: "인솔자동반", id: 7 },
];

const PhotoAlbum = (props: any) => {
  const { mainTitle, data } = props;
  const imageList = data?.image || [];
  const images = [
    ...imageList.filter((t: any) => t.isThumb === true),
    ...imageList.filter((t: any) => t.isThumb === false),
  ].map((t: any) => t.imageUrl);
  // const images = [...images2, ...images2].slice(0, 5);
  // const images = Array(0).fill("/images/tmp/gridTemp.png");
  return (
    <div className="mt-[50px] flex w-full max-w-[1320px] flex-col justify-center ">
      <div className="title-box mb-4 flex w-full justify-between">
        <h1 className="m-0 font-['Pretendard'] text-[35px] font-bold leading-[40px] text-[#00192f]">
          {data && data.name}
        </h1>
        {/* <span className="font-['Pretendard'] text-base font-medium leading-[19px] text-[#bbbbbb]">
          중분류 {">"} 소분류
        </span> */}
      </div>
      {/* <div className="buttn-box mb-5 flex w-full items-center justify-between">
        <div className="button-box-info flex gap-[7.64px]">
          {tempButtonText.map((text) => (
            <SmallButton key={text.id} text={text.label} />
          ))}
        </div>
        <div className="button-box-social flex gap-[10.77px]">
          {[1, 2, 3, 4, 5].map((temp) => (
            <div
              key={temp}
              className="button-box-social__button flex h-[32px] w-[32px] rounded-[50%] bg-socialKakao bg-center object-contain"
            />
          ))}
        </div>
      </div> */}
      {images.length > 0 && (
        <div className="grid-album-box grid h-[500px] w-full grid-cols-[minmax(260px,_1.5fr)_minmax(260px,_1.5fr)_minmax(260px,_1fr)_minmax(260px,_1fr)_] grid-rows-2 gap-2">
          {images.length > 0 && (
            <div
              className="grid-album-item relative row-start-1 row-end-3 flex"
              style={{
                gridColumnStart: 1,
                gridColumnEnd: images.length > 1 ? 3 : 5,
              }}
            >
              <Image
                src={images[0]}
                objectFit="cover"
                layout="fill"
                alt="상품이미지"
              />
            </div>
          )}
          {images.length > 1 && (
            <div
              className="grid-album-item relative flex"
              style={{
                gridColumnStart: 3,
                gridColumnEnd: images.length > 4 ? 4 : 5,
                gridRowStart: 1,
                gridRowEnd: images.length > 2 ? 2 : 3,
              }}
            >
              <Image
                src={images[1]}
                objectFit="cover"
                layout="fill"
                alt="상품이미지"
              />
            </div>
          )}
          {images.length > 2 && (
            <div
              className="grid-album-item relative flex"
              style={{
                gridColumnStart: images.length > 4 ? 4 : 3,
                gridColumnEnd: images.length === 4 ? 4 : 5,
                gridRowStart: images.length > 4 ? 1 : 2,
                gridRowEnd: images.length > 4 ? 2 : 3,
              }}
            >
              <Image
                src={images[2]}
                objectFit="cover"
                layout="fill"
                alt="상품이미지"
              />
            </div>
          )}
          {images.length > 3 && (
            <div
              className="grid-album-item relative flex"
              style={{
                gridColumnStart: images.length === 4 ? 4 : 3,
                gridColumnEnd: images.length === 4 ? 5 : 4,
                gridRowStart: 2,
                gridRowEnd: 3,
              }}
            >
              <Image
                src={images[3]}
                objectFit="cover"
                layout="fill"
                alt="상품이미지"
              />
            </div>
          )}
          {images.length > 4 && (
            <div
              className="grid-album-item relative flex"
              style={{
                gridColumnStart: 4,
                gridColumnEnd: 5,
                gridRowStart: 2,
                gridRowEnd: 3,
              }}
            >
              <Image
                src={images[4]}
                objectFit="cover"
                layout="fill"
                alt="상품이미지"
              />
            </div>
          )}
          {/* <div className="grid-album-item flex bg-gridTemp" />
        <div className="grid-album-item__last relative flex ">
          <div className="grid-album-item flex w-full  bg-gridTemp brightness-[0.75]" />
          <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[44.2px] font-semibold leading-[53px] text-[#ffffff]">
            +{ImgOverflowLength}
          </span>
        </div> */}
        </div>
      )}
    </div>
  );
};

PhotoAlbum.defaultProps = {
  mainTitle: "Gastronomia, 스페인 북부 9DAYS",
};
export default PhotoAlbum;
