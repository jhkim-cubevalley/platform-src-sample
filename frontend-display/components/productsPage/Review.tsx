import React, { useState } from "react";
import Star from "../../public/images/star.svg";
import TempProfile from "../../public/images/tmp/tmpProfile.png";
import Image from "next/image";

const tempData = {
  totalScore: 4.94,
  reviews: [
    {
      user: { profileImgUrl: "", userName: "닉네임" },
      rating: "5.0",
      createdAt: "2022.06.07",
      content:
        "후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기",
      likePoint: "경치가 좋아요",
    },
    {
      user: { profileImgUrl: "", userName: "닉네임" },
      rating: 3.0,
      createdAt: "2022.06.07",
      content:
        "후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기",
      likePoint: "경치가 좋아요",
    },
    {
      user: { profileImgUrl: "", userName: "닉네임" },
      rating: "5.0",
      createdAt: "2022.06.07",
      content:
        "후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기",
      likePoint: "경치가 좋아요",
    },
    {
      user: { profileImgUrl: "", userName: "닉네임" },
      rating: "5.0",
      createdAt: "2022.06.07",
      content:
        "후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기",
      likePoint: "경치가 좋아요",
    },
    {
      user: { profileImgUrl: "", userName: "닉네임" },
      rating: "5.0",
      createdAt: "2022.06.07",
      content:
        "후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기",
      likePoint: "경치가 좋아요",
    },
    {
      user: { profileImgUrl: "", userName: "닉네임" },
      rating: "5.0",
      createdAt: "2022.06.07",
      content:
        "후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기",
      likePoint: "경치가 좋아요",
    },
    {
      user: { profileImgUrl: "", userName: "닉네임" },
      rating: "5.0",
      createdAt: "2022.06.07",
      content:
        "후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기",
      likePoint: "경치가 좋아요",
    },
    {
      user: { profileImgUrl: "", userName: "닉네임" },
      rating: "5.0",
      createdAt: "2022.06.07",
      content:
        "후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기",
      likePoint: "경치가 좋아요",
    },
    {
      user: { profileImgUrl: "", userName: "닉네임" },
      rating: "5.0",
      createdAt: "2022.06.07",
      content:
        "후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기",
      likePoint: "경치가 좋아요",
    },
    {
      user: { profileImgUrl: "", userName: "닉네임" },
      rating: "5.0",
      createdAt: "2022.06.07",
      content:
        "후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기",
      likePoint: "경치가 좋아요",
    },
    {
      user: { profileImgUrl: "", userName: "닉네임" },
      rating: "5.0",
      createdAt: "2022.06.07",
      content:
        "후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기",
      likePoint: "경치가 좋아요",
    },
    {
      user: { profileImgUrl: "", userName: "닉네임" },
      rating: "5.0",
      createdAt: "2022.06.07",
      content:
        "후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기",
      likePoint: "경치가 좋아요",
    },
    {
      user: { profileImgUrl: "", userName: "닉네임" },
      rating: "5.0",
      createdAt: "2022.06.07",
      content:
        "후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기",
      likePoint: "경치가 좋아요",
    },
    {
      user: { profileImgUrl: "", userName: "닉네임" },
      rating: "5.0",
      createdAt: "2022.06.07",
      content:
        "후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기후기",
      likePoint: "경치가 좋아요",
    },
  ],
};

const overflowNum = tempData.reviews.length - 2;

const ReviewContent = (props: any) => {
  const { review } = props;
  return (
    <div className="review-content flex h-[161px] min-w-[245px] flex-col gap-[10px] rounded-[7px] border-[0.57px] border-[#bababa]  p-[13px] lg:h-[275.2px] lg:w-2/4 lg:max-w-[420px] lg:gap-[18px] lg:p-[23px] ">
      <div className="review-content-user flex">
        <div className="review-content-user-col flex w-full justify-between">
          <div className="flex gap-[6.25px] lg:gap-[10px]">
            <div className="review-content-user-profileWrpper hidden lg:flex">
              <Image
                alt=""
                src={TempProfile.src}
                width="53"
                height="53"
                layout="fixed"
              />
            </div>
            <div className="review-content-user-profileWrpper flex lg:hidden">
              <Image
                alt=""
                src={TempProfile.src}
                width="31"
                height="31"
                layout="fixed"
              />
            </div>

            <div className="review-content-userNameRating flex flex-col items-center justify-center ">
              <h2 className="m-0 font-['Pretendard'] text-[10.5px] font-medium leading-[18.9px] text-[#000000] lg:text-[18px] lg:leading-[32px]">
                {review.user.userName}
              </h2>
              <div className="flex items-center gap-[2px]  lg:gap-[5px]  ">
                <div className="block lg:hidden">
                  <Star width="8.52px" height="8.52px" />
                </div>
                <div className="hidden lg:block">
                  <Star width="15px" height="15px" />
                </div>
                <span className="font-['Pretendard'] text-[10.5px] font-normal leading-[12.5px] text-[#000000] lg:text-[18px] lg:leading-[21px]">
                  {review.rating}
                </span>
              </div>
            </div>
          </div>

          <div className="review-content-createdAt flex">
            <p className="font-['Pretendard'] text-[9.3px] font-normal leading-[18.83px] text-[#b5b5b5] lg:text-[16px] lg:leading-[32px]">
              {review.createdAt}
            </p>
          </div>
        </div>
      </div>

      <div className="review-content-content flex h-[40%] lg:h-fit">
        <p className="m-0 font-['Pretendard'] text-[10.5px] font-normal leading-[16.33px] text-[#5a5a5a] lg:text-[18px] lg:leading-[28px]">
          {`${review.content.substring(0, 50)}...`}
        </p>
      </div>

      <div className="review-content-likePoint box-border flex h-[33.5px] w-[80px] items-center justify-center rounded-[3.5px] bg-[#f8f8f8] p-[4px_8px] lg:h-[33px] lg:w-[135px] lg:max-w-[135px] lg:rounded-[6px] lg:p-[7px_14px]">
        <span className="font-['Pretendard'] text-[9.3px] font-normal leading-[11.1px] text-[#494949]  lg:text-[16px] lg:leading-[19px]">
          {review.likePoint}
        </span>
      </div>
    </div>
  );
};

const Review = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <div className="review flex w-full flex-col gap-[25px] px-[20px] pt-[34px] pb-[38px] lg:px-0 lg:pb-0 lg:pt-[68px]">
      <div className="review-totalScore flex items-center gap-[10px]">
        <Star width="18" height="18" />
        <h1 className="m-0 font-['Pretendard'] text-[17.5px] font-medium leading-[21px] text-[#262626] lg:text-[30px] lg:leading-[36px]">
          {tempData?.totalScore}
        </h1>
      </div>

      <div className="review-contents no-scrollbar  flex w-full gap-[17.5px] overflow-scroll  lg:flex-wrap lg:justify-between lg:gap-[30px] lg:overflow-visible">
        {!showMore &&
          tempData?.reviews?.map((review, index) =>
            index < 2 ? <ReviewContent key={index} review={review} /> : null
          )}

        {showMore &&
          tempData?.reviews?.map((review, index) => (
            <ReviewContent key={index} review={review} />
          ))}
      </div>

      <div
        className=" review-showmore flex max-w-[144px] cursor-pointer items-center justify-center rounded-[7px] border-[1.5px] border-[#00192f] px-[13px] py-[12px] lg:max-w-[238.46px] lg:py-[17px] lg:px-[35px]"
        onClick={toggleShowMore}
      >
        <span className="font-['Pretendard'] text-[14px] font-medium leading-[16.7px] text-[#00192f] lg:text-[20px] lg:leading-[23.87px]">
          {!showMore ? `후기 ${overflowNum}개 모두 보기` : "접기"}
        </span>
      </div>
    </div>
  );
};

export default Review;
